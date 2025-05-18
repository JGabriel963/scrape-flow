"use client"

import CustomDialogHeader from "@/components/global/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { Layers2Icon, LoaderIcon } from "lucide-react";
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";


export default function CreateWorlflowDialog({ triggerText }: { triggerText?: string }) {
    const [open, setOpen] = useState(false);

    const form = useForm<createWorkflowSchemaType>({
      resolver: zodResolver(createWorkflowSchema),
      defaultValues: {}
    })

    const { mutate, isPending } = useMutation({
      mutationFn: CreateWorkflow,
      onSuccess: () => {
        toast.success("Workflow created")
      },
      onError: () => {
        toast.error("Failed to create workflow")
      },
    });

    const onSubmit = useCallback((values: createWorkflowSchemaType) => {
      toast.loading("Creating workflow...");
      mutate(values)
    }, [mutate])

  return (
    <Dialog open={open} onOpenChange={(open) => {
      form.reset();
      setOpen(open)
    }}>
        <DialogTrigger asChild>
            <Button>
                {triggerText ?? "Create workflow"}
            </Button>
        </DialogTrigger>
        <DialogContent className="px-0">
          <CustomDialogHeader
            icon={Layers2Icon}
            title="Create workflow"
            subTitle="Satrt building your workflow"
          />
          <div className="p-6">
            <Form {...form}>
              <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-1 items-center">
                        Name
                        <p className="text-xs text-primary"> (required) </p>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose a descriptive and unique name
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-1 items-center">
                        Description
                        <p className="text-xs text-muted-foreground"> (optional) </p>
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a brief description of what your workflow does. <br /> This is optional but can help you remember the workflow&apos;s porpose
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <LoaderIcon className="animate-spin" /> : "Procced"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
    </Dialog>
  )
}
