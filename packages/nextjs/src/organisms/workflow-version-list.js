import WorkflowVersionListItem from "~/molecules/workflow-version-list-item";

export default function WorkflowVersionList ({ workflowVersions }) {
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
