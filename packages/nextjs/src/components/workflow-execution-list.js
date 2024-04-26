import Placeholder from "~/components/placeholder";
import WorkflowExecutionListItem from "~/components/workflow-execution-list-item";

export default function WorkflowExecutionList ({ workflowExecutions }) {
    if (workflowExecutions.length === 0) {
        return (
            <Placeholder
                title="No workflow execution"
                description="You haven't executed this workflow version yet. Do you want to execute it?" />
        );
    }

    return (
        <div class="card-list">
            {workflowExecutions.map(workflowExecution => (
                <WorkflowExecutionListItem
                    key={workflowExecution.id}
                    workflowExecution={workflowExecution} />
            ))}
        </div>
    );
}
