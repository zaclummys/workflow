import Placeholder from "~/molecules/placeholder";
import WorkflowVersionListItem from "~/molecules/workflow-version-list-item";

export default function WorkflowVersionList ({ workflowVersions }) {
    if (workflowVersions.length === 0) {
        return (
            <Placeholder
                title="No workflow version"
                description="You haven't created any workflow version yet. Do you want to create one?" />
        );
    }

    return (
        <div class="card-list">
            {workflowVersions.map(workflowVersion => (
                <WorkflowVersionListItem
                    key={workflowVersion.id}
                    workflowVersion={workflowVersion} />
            ))}
        </div>
    );
}
