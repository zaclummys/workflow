import Grid from '~/components/grid';

import DateAgo from '~/components/date-ago';

import {
    Card,
    CardTitle,
    CardText,
    CardLink, 
} from '~/components/card';

import getUserAction from '~/actions/get-user-action';

export function WorkflowVersionGrid ({ children }) {
    return (
        <Grid>
            {children}
        </Grid>
    );
}

export async function WorkflowVersionGridItem ({ workflowVersion }) {
    const { user } = await getUserAction(workflowVersion.createdById);

    if (!user) {
        return null;
    }

    return (
        <Card>
            <CardTitle>
                Version {workflowVersion.number}
            </CardTitle>

            <CardText>
                {workflowVersion.elements.length} element(s) - {workflowVersion.variables.length} variable(s)
            </CardText>

            <CardText>
                Created <DateAgo date={workflowVersion.createdAt} /> by {user.name}
            </CardText>

            <CardLink
                href={`/workflow-version/${workflowVersion.id}`} />
        </Card>
    );
}