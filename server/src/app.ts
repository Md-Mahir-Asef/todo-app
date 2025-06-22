import express from "express";
import routes from "./routes";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
config();

const app = express();

app.use(morgan("combined"));
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use("/api", routes);

export default app;
