import Link from 'next/link';
import WorkflowExecutionStatus from './workflow-execution-status';
import {
    calculateTimeAgo, 
} from '../date-time';

export default function WorkflowExecutionListItem ({ workflowExecution }) {
    const howLongAgoWasExecuted = calculateTimeAgo(workflowExecution.executedAt);

    return (
        <div className="card">
            <div className="flex flex-row">
                <div className="flex flex-col grow">
                    <span className="card-title">
                        Workflow Execution {workflowExecution.number}
                    </span>

                    <span className="card-subtitle">
                        {workflowExecution.id}
                    </span>
                </div>

                <div>
                    <WorkflowExecutionStatus status={workflowExecution.status} />
                </div>
            </div>

            <span className="card-text">
                Executed {howLongAgoWasExecuted} by {workflowExecution.executedBy}
            </span>

            <Link className="card-link" href={`/workflow-execution/${workflowExecution.id}`} />
        </div>
    );
}
