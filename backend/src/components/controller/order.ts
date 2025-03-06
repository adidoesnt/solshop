import Logger from "../../utils/logger";
import solace from "solclientjs";
import { session } from "../solace";
import {
  createOrder,
  getOrders,
  type Order,
  type OrderItem,
} from "../service/order";

const logger = new Logger("order");

enum OrderRoutes {
  CREATE = "create",
  GET = "get",
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
      return await createOrder(payload as { order: Order; items: OrderItem[] });
    case OrderRoutes.GET:
      logger.info("Getting orders");
      return await getOrders();
    default:
      throw new Error(`Unknown route: ${route}`);
  }
};
