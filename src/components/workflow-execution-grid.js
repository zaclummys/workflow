import Grid from './grid';

import {
    Card,
    CardTitle,
    CardText,
    CardLink,
} from './card';

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
            <CardTitle>
                abc
            </CardTitle>

            <CardText>
                abc
            </CardText>

            <CardLink
                href={`/workflow-execution/${workflowExecution.id}`} />
        </Card>
    );
}