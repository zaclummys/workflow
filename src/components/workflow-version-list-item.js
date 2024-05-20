import Link from 'next/link';
import WorkflowVersionStatus from './workflow-version-status';
import {
    calculateTimeAgo, 
} from '../date-time';

export default function WorkflowVersionListItem ({
    workflowVersion: {
        id,
        number,
        status,
        numberOfExecutions,
        createdAt,
        createdBy,
    },
}) {
    const howLongAgoWasCreated = calculateTimeAgo(createdAt);

    return (
        <div className="card">
            <div className="flex flex-row">
                <div className="flex flex-col grow">
                    <span className="card-title">
                        Workflow Version {number}
                    </span>
                </div>

                <div>
                    <WorkflowVersionStatus status={status} />
                </div>
            </div>

            <span className="card-text">
                {numberOfExecutions} execution(s)
            </span>

            <span className="card-text">
                Created {howLongAgoWasCreated} by {createdBy}
            </span>

            <Link className="card-link" href={`/workflow-version/${id}`} />
        </div>
    );
}
