// src/utils/prisma.ts (or .js)
import { PrismaClient } from "@prisma/client";

// Declare a global variable for PrismaClient in development to prevent multiple instances
// during hot-reloading in environments like Next.js, though less critical for Express.
declare global {
    var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;
