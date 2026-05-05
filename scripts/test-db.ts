// scripts/test-db.ts
import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  try {
    await prisma.$connect();

    const result = await prisma.$queryRaw`SELECT NOW()`;

    console.log("✅ Database connected successfully");
    console.log(result);
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();