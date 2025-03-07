import Logger from "../../utils/logger";
import solace from "solclientjs";
import { session } from "../solace";
import {
  createOrder,
  getOrders,
  handleOrderCreated,
  handleOrderDelivered,
  handleOrderShipped,
  type Order,
  type OrderItem,
} from "../service/order";

const logger = new Logger("order");

enum OrderRoutes {
  CREATE = "create",
  GET = "get",
}

export enum OrderEvents {
  ORDER_CREATED = "orders/new",
  ORDER_SHIPPED = "orders/shipped",
  ORDER_DELIVERED = "orders/delivered",
}

const orderSubscriptions = [
  OrderEvents.ORDER_CREATED,
  OrderEvents.ORDER_SHIPPED,
  OrderEvents.ORDER_DELIVERED,
];

export const initSubscriptions = async () => {
  if (!session) throw new Error("Session not connected");

  orderSubscriptions.forEach(async (subscription) => {
    const topic = solace.SolclientFactory.createTopicDestination(subscription);
    const messageCallback = async (message: solace.Message) => {
      const payload = JSON.parse(message.getBinaryAttachment()?.toString() ?? "{}");
      logger.info(`Received message on topic ${subscription}`, payload);

      switch (subscription) {
        case OrderEvents.ORDER_CREATED:
          await handleOrderCreated(payload.orderId);
          break;
        case OrderEvents.ORDER_SHIPPED:
          await handleOrderShipped(payload.orderId);
          break;
        case OrderEvents.ORDER_DELIVERED:
          await handleOrderDelivered(payload.orderId);
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

export const initOrderRoutes = async () => {
  if (!session) throw new Error("Session not connected");

  Object.values(OrderRoutes).forEach(async (route) => {
    const topic = solace.SolclientFactory.createTopicDestination(route);
    session!.subscribe(topic, true, null, 10000);
  });
};

export const routeRequest = async (
  requestType: string,
  payload: Record<string, unknown>
) => {
  logger.info("Received request", requestType, payload);
  const route = requestType.split(".").pop();

  switch (route) {
    case OrderRoutes.CREATE:
      logger.info("Creating order");
      return await createOrder(
        payload as {
          customerName: string;
          customerEmail: string;
          order: Order;
          items: OrderItem[];
          totalPrice: number;
        }
      );
    case OrderRoutes.GET:
      logger.info("Getting orders");
      return await getOrders(payload as { customerEmail: string });
    default:
      throw new Error(`Unknown route: ${route}`);
  }
};

export const publishOrderCreated = async ({
  order,
  items,
}: {
  order: Order;
  items: OrderItem[];
}) => {
  if (!session) throw new Error("Session not connected");

  const topic = solace.SolclientFactory.createTopicDestination(OrderEvents.ORDER_CREATED);
  const message = solace.SolclientFactory.createMessage();
  message.setBinaryAttachment(Buffer.from(JSON.stringify({ order, items })));
  message.setDestination(topic);

  session!.send(message);
  logger.info("Published order created event", { order, items });
};

export const publishOrderShipped = async (orderId: number) => {
  if (!session) throw new Error("Session not connected");

  const topic = solace.SolclientFactory.createTopicDestination(OrderEvents.ORDER_SHIPPED);
  const message = solace.SolclientFactory.createMessage();
  message.setBinaryAttachment(Buffer.from(JSON.stringify({ orderId })));
  message.setDestination(topic);

  session!.send(message);
  logger.info("Published order shipped event", { orderId });
};

export const publishOrderDelivered = async (orderId: number) => {
  if (!session) throw new Error("Session not connected");

  const topic = solace.SolclientFactory.createTopicDestination(OrderEvents.ORDER_DELIVERED);
  const message = solace.SolclientFactory.createMessage();
  message.setBinaryAttachment(Buffer.from(JSON.stringify({ orderId })));
  message.setDestination(topic);

  session!.send(message);
  logger.info("Published order delivered event", { orderId });
};
