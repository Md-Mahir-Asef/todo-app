import { faker } from "@faker-js/faker";
import prisma from "../src/utils/prisma";
import logger from "../src/utils/logger";
import { Priority, TaskStatus } from "../src/generated/prisma";
import { hasher } from "../src/utils/hasher";

const USERS = 50;
const TODO_PER_USER = 10;
const priorityStrs = ["Not_set", "Low", "Medium", "High"];
const statusStrs = ["Todo", "Doing", "Done"];

async function main() {
  try {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
    const users = [];
    for (let i = 0; i < USERS; i++) {
      const newUser = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: hasher(faker.internet.password()),
        },
      });
      users.push(newUser);
    }
    for (let i = 0; i < USERS; i++) {
      for (let j = 0; j < TODO_PER_USER; j++) {
        await prisma.task.create({
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
            userId: users[i].id,
          },
        });
      }
    }
    logger.info("Seed executed.");
  } catch (err) {
    logger.error("Error While making Seeds", err);
  }
}

main();
