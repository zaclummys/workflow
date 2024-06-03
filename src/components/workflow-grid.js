import Grid from '~/components/grid';
import DateAgo from '~/components/date-ago';

import getWorkflowAction from '~/actions/get-workflow-action';

import {
    Card,
    CardTitle,
    CardText,
    CardLink, 
} from '~/components/card';

export function WorkflowGrid ({ children }) {
    return (
        <Grid>
            {children}
        </Grid>
    );
}

export async function WorkflowGridItem ({ workflowId }) {
    const { workflow } = await getWorkflowAction(workflowId);

    if (!workflow) {
        return null;
    }
    
    return (
        <Card>
            <CardTitle>
                {workflow.name}
            </CardTitle>

            <CardText>
                {workflow.description}
            </CardText>

            <CardText>
                {workflow.numberOfVersions} version(s)
            </CardText>

            <CardText>
                Created <DateAgo date={workflow.createdAt} /> by {workflow.createdBy.name}
            </CardText>

            <CardLink
                title={`Go to ${workflow.name}`}
                href={`/workflow/${workflow.id}`} />
        </Card>
    );
}