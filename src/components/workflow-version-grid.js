import Grid from '~/components/grid';

import DateAgo from '~/components/date-ago';

import {
    Card,
    CardTitle,
    CardText,
    CardLink, 
} from '~/components/card';

import getUserAction from '~/actions/get-user-action';
import WorkflowVersionStatus from './workflow-version-status';

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
            <div className="flex flex-row">
                <CardTitle className="flex-grow">
                    Version {workflowVersion.number}
                </CardTitle>

                <WorkflowVersionStatus
                    status={workflowVersion.status} />
            </div>

            <CardText>
                {workflowVersion.elements.length} element(s) - {workflowVersion.variables.length} variable(s)
            </CardText>

            <CardText>
                Created <DateAgo date={workflowVersion.createdAt} /> by {user.name}
            </CardText>

            <CardLink
                title={`Go to Version ${workflowVersion.number}`}
                href={`/workflow-version/${workflowVersion.id}`} />
        </Card>
    );
}