import Grid from './grid';

import {
    Card,
    CardTitle,
    CardText,
    CardLink,
} from './card';
import WorkflowExecutionStatus from './workflow-execution-status';

export function WorkflowExecutionGrid ({ children }) {
    return (
        <Grid>
            {children}
        </Grid>
    );
}

export function WorkflowExecutionGridItem ({ workflowExecution }) {
    return (
        <Card>
            <div className="flex flex-row">
                <CardTitle className="flex-grow">
                    abc
                </CardTitle>

                <WorkflowExecutionStatus
                    status={workflowExecution.status} />
            </div>

            <CardText>
                abc
            </CardText>

            <CardLink
                title={`Go to Execution ${workflowExecution.id}`}
                href={`/workflow-execution/${workflowExecution.id}`} />
        </Card>
    );
}