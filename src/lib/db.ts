import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set. Using fallback for build.");
    // Force set the env if it's missing during build to prevent core crash
    process.env.DATABASE_URL = "file:./dev.db";
  }
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
