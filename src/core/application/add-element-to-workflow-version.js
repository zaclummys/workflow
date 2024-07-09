import {
    findWorkflowVersionById,
    updateWorkflowVersion,
} from '~/core/data/mongodb/workflow-version';

import {
    WorkflowIfElement,
    WorkflowAssignElement,
} from '~/core/domain/workflow-version';

export default async function addElementToWorkflowVersion ({
    elementData,
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

    const element = createElement(elementData);
    
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

function createElement ({ type, ...attributes }) {
    switch (type) {
        case 'if': {    
            return WorkflowIfElement.create(attributes);
        }

        case 'assign': {
           return WorkflowAssignElement.create(attributes);
        }

        default:
            throw new Error(`Unknown element type: ${type}`);
    }
}