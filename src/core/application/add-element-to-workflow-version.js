import {
    findWorkflowVersionById,
    updateWorkflowVersion,
} from '~/core/data/mongodb/workflow-version';

import {
    WorkflowAssignElement,
} from '~/core/domain/workflow-version';
import { WorkflowIfElement } from '../domain/workflow-version/workflow-if-element';

export default async function addElementToWorkflowVersion ({
    elementType,
    previousElementId,
    previousElementBranch,
    workflowVersionId,
}) {
    const workflowVersion = await findWorkflowVersionById(workflowVersionId);

    if (!workflowVersion) {
        return {
            success: false,
            message: 'Workflow Version not found',
        };
    }

    const element = createElementFromType(elementType);
    
    if (!element) {
        return {
            success: false,
            message: 'Unknown element type',
        };
    }
    
    workflowVersion.addElement({
        element,
        previousElementId,
        previousElementBranch,
    });

    await updateWorkflowVersion(workflowVersion);

    return {
        success: true,
    };
}

function createElementFromType (elementType) {
    switch (elementType) {
        case 'if': {    
            return WorkflowIfElement.create();
        }

        case 'assign': {
           return WorkflowAssignElement.create();
        }

        default:
            return null;
    }
}