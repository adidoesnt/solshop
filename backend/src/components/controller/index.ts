import { REQUESTS_QUEUE } from "../../constants";
import Logger from "../../utils/logger";
import { session } from "../solace";
import solace from "solclientjs";
import * as productController from "./product";

export enum RequestPrefixes {
  PRODUCTS = "products",
}

const logger = new Logger("controller");

const initRoutes = async () => {
  await productController.initProductRoutes();
}

const routeRequest = async (message: solace.Message) => {
  const destination = message.getDestination();

  if (!destination) throw new Error("Destination not found");

  const topic = destination.getName();
  const prefix = topic.split(".").shift();
  const payload = JSON.parse(message.getBinaryAttachment()?.toString() ?? "{}");

  logger.info(`Received request: ${prefix}`, payload);

  switch (prefix) {
    case RequestPrefixes.PRODUCTS:
      return await productController.routeRequest(topic, payload);
    default:
      return logger.error(`Unknown request prefix: ${prefix}`);
  }
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
      logger.info("Received message", message);
      await routeRequest(message);
    });

    consumer.connect();
  } catch (error) {
    logger.error("Error in receiveRequests", error);
    throw error;
  }
};
