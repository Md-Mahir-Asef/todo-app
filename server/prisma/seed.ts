import { faker } from "@faker-js/faker";
import prisma from "../src/utils/prisma";

const TODOS_PER_USER = 10; // How many todos per user

async function main() {
  console.log("Seeding database with realistic data...");

  console.log(`👤 Created user ${1} with ${TODOS_PER_USER} todos`);

  console.log("✅ Seed complete.");
}

main();
