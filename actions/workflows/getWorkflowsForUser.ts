import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowForUser() {
    const { userId } = auth();

    if(!userId) {
        throw new Error("Unauthenticated");
    }

    return prisma.workflow.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "asc"
        }
    })
}