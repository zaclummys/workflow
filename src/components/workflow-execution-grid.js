import Grid from './grid';
import DateAgo from './date-ago';

import {
    Card,
    CardTitle,
    CardText,
    CardLink,
} from './card';

import WorkflowExecutionStatus from './workflow-execution-status';

import getWorkflowExecutionAction from '~/actions/get-workflow-execution-action';

export function WorkflowExecutionGrid ({ children }) {
    return (
        <Grid>
            {children}
        </Grid>
    );
}

export async function WorkflowExecutionGridItem ({ workflowExecutionId }) {
    const { workflowExecution } = await getWorkflowExecutionAction(workflowExecutionId);

    if (!workflowExecution) {
        return null;
    }

    return (
        <Card>
            <div className="flex flex-row">
                <CardTitle className="flex-grow">
                    Workflow Execution
                </CardTitle>

                <WorkflowExecutionStatus
                    status={workflowExecution.status} />
            </div>

            <CardText>
                {workflowExecution.id}
            </CardText>

            <CardText>
                Executed <DateAgo date={workflowExecution.executedAt} />
            </CardText>

            <CardLink
                title={`Go to Workflow Execution ${workflowExecution.id}`}
                href={`/workflow-execution/${workflowExecution.id}`} />
        </Card>
    );
}