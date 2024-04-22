import Link from 'next/link';

import WorkflowExecutionStatus from './workflow-execution-status';

import { calculateTimeAgo } from '../date-time';

export default function WorkflowExecutionListItem ({
    execution: {
        id,
        number,
        status,
        executedAt,
        executedBy,
    }
}) {
    const howLongAgoWasExecuted = calculateTimeAgo(executedAt);

    return (
        <div className="card">
            <div className="flex flex-row">
                <div class="flex flex-col grow">
                    <span className="card-title">
                        Workflow Execution {number}
                    </span>

                    <span className="card-subtitle">
                        {id}
                    </span>
                </div>

                <div>
                    <WorkflowExecutionStatus status={status} />
                </div>
            </div>

            <span className="card-text">
                Executed {howLongAgoWasExecuted} by {executedBy}
            </span>

            <Link class="card-link" href={`/workflow-execution/${id}`} />
        </div>
    );
}
