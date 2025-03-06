import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";;
import Logger from "./utils/logger";
import { testConnection } from "./components/database";
import { connectToSolace } from "./components/solace";
import { receiveRequests } from "./components/controller";

const logger = new Logger('index');
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

await testConnection();

await connectToSolace();
receiveRequests();
