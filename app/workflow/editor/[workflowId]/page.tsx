import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import Editor from '../../_components/Editor';

export default async function page({ params }: { params: { workflowId: string } }) {
    const { workflowId } = params
    const { userId } = auth();

    if (!userId) return <div>Unauthenticated</div>

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId,
        }
    })

    if (!workflow) {
        return <div>Workflow not found</div>
    }

  return <Editor workflow={workflow} />
}
