import { testConnection } from "./components/database";
import { connectToSolace } from "./components/solace";
import {
  initRoutes,
  initSubscriptions,
  receiveRequests,
} from "./components/controller";

await testConnection();

await connectToSolace();
await receiveRequests();
await initRoutes();
await initSubscriptions();
