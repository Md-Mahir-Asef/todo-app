import { faker } from "@faker-js/faker";
import prisma from "../src/utils/prisma";
import logger from "../src/utils/logger";
import { Priority, TaskStatus } from "../src/generated/prisma";

const TODOS_PER_USER = 50;
const priorityStrs = ["Not_set", "Low", "Medium", "High"];
const statusStrs = ["Todo", "Doing", "Done"];

async function main() {
  try {
    await prisma.tasks.deleteMany();
    for (let i = 0; i < TODOS_PER_USER; i++) {
      await prisma.tasks.create({
        data: {
          title: faker.word.verb(),
          description: faker.commerce.productDescription(),
          dueDate: new Date(faker.date.anytime()).toISOString(),
          priority: priorityStrs[
            Math.floor(Math.random() * priorityStrs.length)
          ] as Priority,
          status: statusStrs[
            Math.floor(Math.random() * statusStrs.length)
          ] as TaskStatus,
        },
      });
    }
    logger.info("Seed executed.");
  } catch (err) {
    logger.error("Error While making Seeds", err);
  }
}

main();
