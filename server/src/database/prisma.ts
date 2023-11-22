import findById from "./extensions/findById";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// add extensions
export const db = prisma.$extends(findById);
