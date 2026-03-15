import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
    // Return a dummy client or handle missing DB URL gracefully during build
    console.warn("DATABASE_URL is not set. Prisma might fail if queried.");
  }
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
