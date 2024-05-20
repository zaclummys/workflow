import Grid from '~/components/grid';
import {
    Card, CardTitle, CardText, CardLink, 
} from '~/components/card';

export function WorkflowGrid ({ children }) {
    return (
        <Grid>
            {children}
        </Grid>
    );
}

export function WorkflowGridItem ({ workflow }) {
    return (
        <Card>
            <CardTitle>
                {workflow.name}
            </CardTitle>

            <CardText>
                {workflow.description}
            </CardText>

            <CardLink
                href={`/workflow/${workflow.id}`} />
        </Card>
    );
}