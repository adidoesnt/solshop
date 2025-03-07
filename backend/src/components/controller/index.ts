import { REQUESTS_QUEUE } from "../../constants";
import Logger from "../../utils/logger";
import { session } from "../solace";
import solace from "solclientjs";
import * as productController from "./product";
import * as orderController from "./order";

export enum RequestPrefixes {
  PRODUCTS = "products",
  ORDERS = "orders",
}

const logger = new Logger("controller");

export const initRoutes = async () => {
  await productController.initProductRoutes();
  await orderController.initOrderRoutes();

  logger.info("Routes initialised");
}

export const initSubscriptions = async () => {
  await productController.initSubscriptions();

  logger.info("Subscriptions initialised");
}

const routeRequest = async (message: solace.Message) => {
  const payload = JSON.parse(message.getBinaryAttachment()?.toString() ?? "{}");

  const { requestType, data } = payload ?? {};
  if (!requestType) throw new Error("Request type not found");

  const prefix = requestType.split(".").shift();

  logger.info(`Received request: ${prefix}`, { requestType, data });

  let response;
  switch (prefix) {
    case RequestPrefixes.PRODUCTS:
      response = await productController.routeRequest(requestType, data);
      break;
    case RequestPrefixes.ORDERS:
      response = await orderController.routeRequest(requestType, data);
      break;
    default:
      throw new Error(`Unknown request prefix: ${prefix}`);
  }

  logger.info("Sending response", response);

  const reply = solace.SolclientFactory.createMessage();
  reply.setBinaryAttachment(Buffer.from(JSON.stringify(response)));

  session?.sendReply(message, reply);
};

export const receiveRequests = async () => {
  try {
    if (!session) throw new Error("Session not connected");

    // This queue needs to be created beforehand, not dynamically
    const destination =
      solace.SolclientFactory.createDurableQueueDestination(REQUESTS_QUEUE);
    logger.info(`Listening to ${destination.name}...`);

    const consumer = session!.createMessageConsumer({
      queueDescriptor: {
        name: destination.name,
        type: solace.DestinationType.QUEUE,
      },
      ackMode: solace.MessageConsumerAcknowledgeMode.AUTO,
    });

    consumer.on(solace.MessageConsumerEventName.UP, () => {
      logger.info("Consumer is active");
    });

    consumer.on(solace.MessageConsumerEventName.MESSAGE, async (message) => {
      logger.info("Received message");
      await routeRequest(message);
    });

    consumer.connect();
  } catch (error) {
    logger.error("Error in receiveRequests", error);
    throw error;
  }
};
