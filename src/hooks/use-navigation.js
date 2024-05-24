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

        navigateToEditWorkflowVersion: (workflowVersionId) => {
            router.push(`/workflow-version/${workflowVersionId}/edit`);
        },
    };
}