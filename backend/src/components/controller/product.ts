import Logger from "../../utils/logger";
import solace from "solclientjs";
import { session } from "../solace";
import { getProducts } from "../service/product";

const logger = new Logger("product");

enum ProductRoutes {
    GET = "get",
    GET_BY_ID = "getById",
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
