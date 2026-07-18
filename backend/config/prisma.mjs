import { prismaClient } from "@prisma/client";

const prisma = new prismaClient({
    log:["query"],
})

export default prisma;

