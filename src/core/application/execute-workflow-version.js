import { findSessionByToken } from '~/core/data/mongodb/session';
import { findWorkflowVersionById } from '~/core/data/mongodb/workflow-version';

import {
    findWorkflowExecutionById,
    insertWorkflowExecution,
    updateWorkflowExecution,
} from '~/core/data/mongodb/workflow-execution';

import { WorkflowExecution } from '~/core/domain/workflow-execution';

export default async function executeWorkflowVersion ({
    workflowVersionId,
    inputValues,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workflowVersion = await findWorkflowVersionById(workflowVersionId);

    if (!workflowVersion) {
        return {
            success: false,
        };
    }

    const workflowExecution = WorkflowExecution.create({
        inputValues,
        workflowVersionId,
        executedById: session.getUserId(),
    });

    await insertWorkflowExecution(workflowExecution);

    try {
        workflowExecution.setStatus('running');
        workflowExecution.setStartedAt(new Date());
    
        await updateWorkflowExecution(workflowExecution);

        workflowVersion.execute();
    
        workflowExecution.setStatus('success');
        workflowExecution.setFinishedAt(new Date());
    
        await updateWorkflowExecution(workflowExecution);
    } catch (error) {
        console.error(error);
        
        workflowExecution.setStatus('error');
        workflowExecution.setFinishedAt(new Date());
    
        await updateWorkflowExecution(workflowExecution);
    }

    return {
        success: true,
        workflowExecutionId: workflowExecution.getId(),
    };
}