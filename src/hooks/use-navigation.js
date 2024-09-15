import { useRouter } from 'next/navigation';

export default function useNavigation () {
    const router = useRouter();

    return {
        navigateToHome: () => {
            console.debug('Navigating to home...');
            
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

        navigateToEditWorkflowVersion: (workflowVersionId) => {
            router.push(`/workflow-version/${workflowVersionId}/edit`);
        },

        navigateToWorkflowExecution: (workflowExecutionId) => {
            router.push(`/workflow-execution/${workflowExecutionId}`);
        },

        replaceBySignIn: () => {
            router.replace('/sign-in');
        },
    };
}