import app from "./app";
import { config } from "dotenv";
import logger from "./utils/logger";
import prisma from "./utils/prisma";

config();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

const shoutDownHandeler = async () => {
  logger.warn("Server is Shutting Down..");
  await prisma.$disconnect();
  logger.warn("Prisma is Disconnected!");
  server.close(() => {
    logger.warn("Server is Shuted Down.");
    process.exit(0);
  });
};

process.on("SIGINT", shoutDownHandeler);
process.on("SIGTERM", shoutDownHandeler);
