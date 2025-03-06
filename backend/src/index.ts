import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { PORT } from "./constants";
import Logger from "./utils/logger";

const logger = new Logger('index');
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(PORT, () => {
  logger.info(`🌞 Solshop backend server is running on port ${PORT}`);
});
