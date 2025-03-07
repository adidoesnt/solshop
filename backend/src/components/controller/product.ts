import Logger from "../../utils/logger";
import solace from "solclientjs";
import { session } from "../solace";
import { getProducts, handleOrderCreated } from "../service/product";
import { OrderEvents } from "./order";
import { createProductView, getMostViewedProducts, getRecentViews } from "../service/analytics";
const logger = new Logger("product");

enum ProductRoutes {
    GET = "get",
    GET_TRENDING = "trending",
    GET_FOR_YOU = "for-you",
}

enum ProductEvents {
  PRODUCT_VIEWED = "products/view",
}

const productSubscriptions = [
  OrderEvents.ORDER_CREATED,
  ProductEvents.PRODUCT_VIEWED,
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
        case ProductEvents.PRODUCT_VIEWED:
          await createProductView(payload.productId, payload.customerEmail);
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
    case ProductRoutes.GET_TRENDING:
      logger.info("Getting trending products");
      return await getMostViewedProducts();
    case ProductRoutes.GET_FOR_YOU:
      logger.info("Getting for you products");
      return await getRecentViews(payload.customerEmail as string);
    default:
      throw new Error(`Unknown route: ${route}`);
  }
};
