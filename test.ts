// scripts/test-db.ts
import "dotenv/config";
import { PrismaClient } from "./app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ["query", "error", "warn"],
});

async function main() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  const users = await prisma.user.findMany({
    take: 5,
  });

  console.log(users);
}

main()
  .catch((err) => {
    console.error("DB TEST ERROR:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });