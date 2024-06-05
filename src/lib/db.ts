// This line imports the PrismaClient class from the @prisma/client package. PrismaClient is used to interact with the database.
import { PrismaClient } from "@prisma/client";

//This block declares a global variable prisma of type PrismaClient or undefined. Declaring it globally helps to prevent the creation of multiple instances of PrismaClient, especially useful in serverless environments.
declare global {
  var prisma: PrismaClient | undefined;
}

//This line exports a constant db. It first checks if there is already a prisma instance on the global object (globalThis.prisma). If there is, it assigns that instance to db. If not, it creates a new instance of PrismaClient and assigns it to db.
export const db = globalThis.prisma || new PrismaClient();

//This conditional statement checks if the current environment is not production (process.env.NODE_ENV !== "production"). If true, it assigns the db instance to globalThis.prisma. This ensures that in development mode, the same PrismaClient instance is reused across hot module reloads, preventing the creation of multiple connections to the database.
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// Import PrismaClient: Import the PrismaClient class from the @prisma/client package.
// Declare Global Variable: Declare a global variable prisma to potentially hold an instance of PrismaClient.
// Create or Reuse Prisma Client Instance: Export a constant db that either uses an existing prisma instance or creates a new PrismaClient instance.
// Assign Global Instance in Development: In non-production environments, assign the db instance to globalThis.prisma to reuse the same instance across module reloads.
// This setup helps to manage database connections efficiently, especially in development, by ensuring that only one instance of PrismaClient is used.
