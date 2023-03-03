import express from "express";
import config from "config";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/.env' });

import routes from "./routes";
import connect from "./utils/connect";
import logger from "./utils/logger";

import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");

const app = express();

app.use(express.json());

// middleware used on all routes. put here instead of individually for simplicity.
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  routes(app);
});