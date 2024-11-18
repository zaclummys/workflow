import { WorkflowExecution } from "~/core/domain/workflow-execution/workflow-execution";

import database from './database';

export async function findWorkflowExecutionById (id) {
    const workflowExecutionData = await database
        .collection('workflow-executions')
        .findOne({ id });

    if (!workflowExecutionData) {
        return null;
    }

    return toWorkflowExecution(workflowExecutionData);
}

export async function findWorkflowExecutionIdsByWorkflowVersionId (workflowVersionId) {
    const workflowExecutionIdsData = await database
        .collection('workflow-executions')
        .find({ workflowVersionId }, { projection: { id: 1 } })
        .toArray();

    return workflowExecutionIdsData.map(workflowExecutionIdData => workflowExecutionIdData.id);
}

export async function findWorkflowExecutionIdsByWorkflowVersionIds (workflowVersionIds) {
    const workflowExecutionIdsData = await database
        .collection('workflow-executions')
        .find({ workflowVersionId: { $in: workflowVersionIds } }, { projection: { id: 1 } })
        .toArray();

    return workflowExecutionIdsData.map(workflowExecutionIdData => workflowExecutionIdData.id);
}

export async function countWorkflowExecutionsByWorkflowVersionId (workflowVersionId) {
    return database
        .collection('workflow-executions')
        .countDocuments({ workflowVersionId });
}

export async function insertWorkflowExecution (workflowExecution) {
    await database
        .collection('workflow-executions')
        .insertOne(fromWorkflowExecution(workflowExecution));
}

export async function updateWorkflowExecution (workflowExecution) {
    await database
        .collection('workflow-executions')
        .updateOne(
            { id: workflowExecution.getId() },
            { $set: fromWorkflowExecution(workflowExecution) }
        );
}

export async function deleteWorkflowExecutionById (id) {
    await database
        .collection('workflow-executions')
        .deleteOne({ id });
}

export async function deleteWorkflowExecutionsByIds (ids) {
    await database
        .collection('workflow-executions')
        .deleteMany({ id: { $in: ids } });
}

export async function deleteWorkflowExecutionsByWorkflowVersionId (workflowVersionId) {
    await database
        .collection('workflow-executions')
        .deleteMany({ workflowVersionId });
}

export async function deleteWorkflowExecutionsByWorkflowVersionIds (workflowVersionIds) {
    await database
        .collection('workflow-executions')
        .deleteMany({ workflowVersionId: { $in: workflowVersionIds } });
}

export function fromWorkflowExecution (workflowExecution) {
    return {
        id: workflowExecution.getId(),
        status: workflowExecution.getStatus(),
        inputValues: workflowExecution.getInputValues(),
        outputValues: workflowExecution.getOutputValues(),
        workflowVersionId: workflowExecution.getWorkflowVersionId(),
        startedAt: workflowExecution.getStartedAt(),
        finishedAt: workflowExecution.getFinishedAt(),
        executedById: workflowExecution.getExecutedById(),
    };
}

export function toWorkflowExecution (workflowExecutionData) {
    return new WorkflowExecution(workflowExecutionData);
}