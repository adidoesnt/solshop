import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";;
import { testConnection } from "./components/database";
import { connectToSolace } from "./components/solace";
import { initRoutes, receiveRequests } from "./components/controller";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

await testConnection();

await connectToSolace();
receiveRequests();
initRoutes();
