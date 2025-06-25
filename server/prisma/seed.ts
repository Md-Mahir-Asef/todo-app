import { faker } from "@faker-js/faker";
import prisma from "../src/utils/prisma";
import logger from "../src/utils/logger";

const TODOS_PER_USER = 5;
async function main() {
  try {
    await prisma.tasks.deleteMany();
    for (let i = 0; i < TODOS_PER_USER; i++) {
      await prisma.tasks.create({
        data: {
          title: faker.word.verb(),
          description: faker.commerce.productDescription(),
          dueDate: new Date(faker.date.future()).toISOString(),
        },
      });
    }
    logger.info("Seed executed.");
  } catch (err) {
    logger.error("Error While making Seeds", err);
  }
}

main();
