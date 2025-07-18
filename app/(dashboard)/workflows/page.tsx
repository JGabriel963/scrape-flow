import { GetWorkflowForUser } from "@/actions/workflows/getWorkflowsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, InboxIcon } from "lucide-react";
import React, { Suspense } from "react";
import CreateWorlflowDialog from "./_components/CreateWorlflowDialog";
import WorkflowCard from "./_components/WorkflowCard";

export default function WorkflowPage() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorlflowDialog />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}

function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-ful" />
      ))}
    </div>
  );
}

async function UserWorkflows() {
  const workflows = await GetWorkflowForUser();
  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
            Something went wrong. Please try again later
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent size-20 flex items-center justify-center">
            <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">
                No workflow create yet
            </p>
            <p className="text-sm text-muted-foreground">
                Click the button below to create your first workflow
            </p>
        </div>
        <CreateWorlflowDialog triggerText="Create your first workflow" />
    </div>
  }
  return <div className="grid grid-cols-1 gap-4">
    {workflows.map((workflow) => (
      <WorkflowCard key={workflow.id} workflow={workflow} />
    ))}
  </div>
}
