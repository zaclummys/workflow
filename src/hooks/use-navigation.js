import { useRouter } from 'next/navigation';

export default function useNavigation () {
    const router = useRouter();

    return {
        navigateToHome: () => {
            router.push('/');
        },

        navigateToWorkspace: (workspaceId) => {
            router.push(`/workspace/${workspaceId}`);
        },

        navigateToWorkflow: (workflowId) => {
            router.push(`/workflow/${workflowId}`);
        },

        navigateToWorkflowVersion: (workflowVersionId) => {
            router.push(`/workflow-version/${workflowVersionId}`);
        },

        navigateToWorkflowVersionEditor: (workflowVersionId) => {
            router.push(`/workflow-version/${workflowVersionId}/editor`);
        },

        navigateToWorkflowExecution: (workflowExecutionId) => {
            router.push(`/workflow-execution/${workflowExecutionId}`);
        },

        replaceBySignIn: () => {
            router.replace('/sign-in');
        },
    };
}