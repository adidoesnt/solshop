import Logger from "../../utils/logger";
import solace from "solclientjs";
import { session } from "../solace";
import { getProducts, handleOrderCreated } from "../service/product";
import { OrderEvents } from "./order";
const logger = new Logger("product");

enum ProductRoutes {
    GET = "get",
}

const productSubscriptions = [
  OrderEvents.ORDER_CREATED,
]

export const initSubscriptions = async () => {
  if (!session) throw new Error("Session not connected");

  productSubscriptions.forEach(async (subscription) => {
    const topic = solace.SolclientFactory.createTopicDestination(subscription);
    const messageCallback = async (message: solace.Message) => {
      const payload = JSON.parse(message.getBinaryAttachment()?.toString() ?? "{}");
      logger.info(`Received message on topic ${subscription}`, payload);

      switch (subscription) {
        case OrderEvents.ORDER_CREATED:
          await handleOrderCreated(payload.items);
          break;
        default:
          logger.warn(`No handler for subscription ${subscription}`);
      }
    };

    session!.on(solace.SessionEventCode.MESSAGE, messageCallback);

    session!.subscribe(
      topic,
      true,
      null,
      10000
    );
  });
}

export const initProductRoutes = async () => {
    if (!session) throw new Error("Session not connected");

    Object.values(ProductRoutes).forEach(async (route) => {
        const topic = solace.SolclientFactory.createTopicDestination(route);
        session!.subscribe(topic, true, null, 10000)
    });
}

export const routeRequest = async (requestType: string, payload: Record<string, unknown>) => {
  logger.info("Received request", requestType, payload);
  const route = requestType.split(".").pop();

  switch (route) {
    case ProductRoutes.GET:
      logger.info("Getting products");
      return await getProducts();
    default:
      throw new Error(`Unknown route: ${route}`);
  }
};
