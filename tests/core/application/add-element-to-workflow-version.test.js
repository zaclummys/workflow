import signUp from "~/core/application/sign-up";
import signIn from "~/core/application/sign-in";
import createWorkspace from "~/core/application/create-workspace";
import createWorkflow from "~/core/application/create-workflow";
import createWorkflowVersion from "~/core/application/create-workflow-version";

import addElementToWorkflowVersion from "~/core/application/add-element-to-workflow-version";

import getWorkflowVersion from "~/core/application/get-workflow-version";

async function setup () {
    const signUpOutput = await signUp({
        name: 'John Doe',
        email: 'johndoe@acme.com',
        password: '12345678',
    });

    expect(signUpOutput).toStrictEqual({
        success: true,
        userId: expect.any(String),
    });

    const signInOutput = await signIn({
        email: 'johndoe@acme.com',
        password: '12345678',
    });

    expect(signInOutput).toStrictEqual({
        success: true,
        sessionToken: expect.any(String),
    });

    const createWorkspaceOutput = await createWorkspace({
        name: 'Workspace 1',
        description: 'This is a very cool workspace.',
        sessionToken: signInOutput.sessionToken,
    });

    expect(createWorkspaceOutput).toStrictEqual({
        success: true,
        workspaceId: expect.any(String),
    });

    const createWorkflowOutput = await createWorkflow({
        name: 'Workflow 1',
        description: 'This is a very cool workflow.',
        workspaceId: createWorkspaceOutput.workspaceId,
        sessionToken: signInOutput.sessionToken,
    });

    expect(createWorkflowOutput).toStrictEqual({
        success: true,
        workflowId: expect.any(String),
    });

    const createWorkflowVersionOutput = await createWorkflowVersion({
        workflowId: createWorkflowOutput.workflowId,
        sessionToken: signInOutput.sessionToken,
    });

    expect(createWorkflowVersionOutput).toStrictEqual({
        success: true,
        workflowVersionId: expect.any(String),
    });

    return {
        sessionToken: signInOutput.sessionToken,
        workspaceId: createWorkspaceOutput.workspaceId,
        workflowId: createWorkflowOutput.workflowId,
        workflowVersionId: createWorkflowVersionOutput.workflowVersionId,
    }
}

async function getStartElementId ({
    workflowVersionId,
}) {
    const getWorkflowVersionOutput = await getWorkflowVersion({
        workflowVersionId,
        sessionToken,
    });

    expect(getWorkflowVersionOutput).toStrictEqual({
        success: true,
        workflowVersion: expect.any(Object),
    });

    const { workflowVersion } = getWorkflowVersionOutput;

    return workflowVersion.elements.find(element => element.type ==='start').id;
}

describe('Add element to Workflow Version', async () => {
    it('Add assign element to workflow version', async () => {
        const {
            sessionToken,
            workflowVersionId,
        } = await setup();

        const getWorkflowVersionOutput = await getWorkflowVersion({
            workflowVersionId,
            sessionToken,
        });

        expect(getWorkflowVersionOutput).toStrictEqual({
            success: true,
            workflowVersion: expect.any(Object),
        });

        const { workflowVersion } = getWorkflowVersionOutput;

        const startElement = workflowVersion.elements.find(element => element.type === 'start');

        const addElementToWorkflowVersionOutput = await addElementToWorkflowVersion({
            elementData: {
                type: 'assign',
                name: 'Assign 1',
                description: 'This is an assign element.',
            },

            previousElementId: startElement.id,
            workflowVersionId: workflowVersion.id,

            sessionToken,
        });

        expect(addElementToWorkflowVersionOutput).toStrictEqual({
            success: true,
        });
    });
});