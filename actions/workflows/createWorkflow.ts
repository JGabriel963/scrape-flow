"use server";

import prisma from "@/lib/db";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateWorkflow(formData: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(formData);
  if (!success) {
    throw new Error("Invalid form data");
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error("Unathenticated");
  }

  const workflow = await prisma.workflow.create({
    data: {
        userId,
        status: WorkflowStatus.DRAFT,
        definition: "TODO",
        ...data
    }
  });

  if (!workflow) {
    throw new Error("failde to create workflow")
  }

  redirect(`/workflow/editor/${workflow.id}`)
}
