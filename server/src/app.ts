import express from "express";
import routes from "./routes/index.route";
import cors from "cors";
import { config } from "dotenv";
import { requestLogger } from "./middleware/requestLogger.middleware";
import cookieParser from "cookie-parser";
config();

const app = express();

app.use(cookieParser());
app.use(cors({ origin: process.env.SERVER_CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(requestLogger);
app.use("/api/v1", routes);

export default app;
