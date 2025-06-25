import express from "express";
import routes from "./routes";
import cors from "cors";
import { config } from "dotenv";
import { requestLogger } from "./middleware/requestLogger";
config();

const app = express();

app.use(cors({ origin: process.env.SERVER_CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(requestLogger);
app.use("/api", routes);

export default app;
