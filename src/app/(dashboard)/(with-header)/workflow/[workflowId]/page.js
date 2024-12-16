import Link from 'next/link';

import Container from '~/components/container';

import {
    Placeholder,
    PlaceholderTitle,
    PlaceholderText,
} from '~/components/placeholder';

import {
    Section,
    SectionHeader,
    SectionTitle,
    SectionActions,
} from '~/components/section';

import {
    Details,
    DetailRow,
    DetailCell,
    DetailCellHeader,
    DetailCellText,
} from '~/components/details';

import DateAgo from '~/components/date-ago';

import CreateWorkflowVersionModalButton from '~/components/modal-buttons/create-workflow-version-modal-button';
import DeleteWorkflowModalButton from '~/components/modal-buttons/delete-workflow-modal-button';
import EditWorkflowModalButton from '~/components/modal-buttons/edit-workflow-modal-button';

import {
    WorkflowVersionGrid,
    WorkflowVersionGridItem,
} from '~/components/workflow-version-grid';

import getWorkflowAction from '~/actions/get-workflow-action';
import getWorkflowVersionIdsAction from '~/actions/get-workflow-versions-action';

import GoBack from '~/components/go-back';

export const title = 'Workflow';

export default async function Workflow({ params }) {
    const { workflowId } = await params;

    const { workflow } = await getWorkflowAction(workflowId);

    if (!workflow) {
        return null;
    }

    const { workflowVersionIds } = await getWorkflowVersionIdsAction(workflowId);

    return (
        <>
            <Container>
                <Section>
                    <SectionHeader>
                        <SectionTitle>
                            <GoBack url={`/workspace/${workflow.workspace.id}`} />

                            {workflow.name}
                        </SectionTitle>

                        <SectionActions>
                            <CreateWorkflowVersionModalButton
                                workflowId={workflow.id} />

                            <EditWorkflowModalButton
                                workflow={workflow} />

                            <DeleteWorkflowModalButton
                                workflow={workflow} />
                        </SectionActions>
                    </SectionHeader>

                    <Details>
                        <DetailRow>
                            <DetailCell>
                                <DetailCellHeader>
                                    Workspace
                                </DetailCellHeader>

                                <Link
                                    className="font-medium "
                                    href={`/workspace/${workflow.workspace.id}`}>
                                    {workflow.workspace.name}
                                </Link>
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>
                                    Created At
                                </DetailCellHeader>

                                <DateAgo
                                    date={workflow.createdAt} />
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>
                                    Created By
                                </DetailCellHeader>

                                <DetailCellText>
                                    {workflow.createdBy.name}
                                </DetailCellText>
                            </DetailCell>
                        </DetailRow>

                        <DetailRow>
                            <DetailCell>
                                <DetailCellHeader>
                                    Description
                                </DetailCellHeader>

                                <DetailCellText>
                                    {workflow.description}
                                </DetailCellText>
                            </DetailCell>
                        </DetailRow>
                    </Details>
                </Section>

                <Section>
                    <SectionTitle>Workflow Versions</SectionTitle>

                    {workflowVersionIds.length === 0 ? (
                        <Placeholder>
                            <PlaceholderTitle>No workflow versions</PlaceholderTitle>

                            <PlaceholderText>
                                You haven't created any workflow version yet. Do you want to create one?
                            </PlaceholderText>
                        </Placeholder>
                    ) : (
                        <WorkflowVersionGrid>
                            {workflowVersionIds.map(workflowVersionId => (
                                <WorkflowVersionGridItem
                                    key={workflowVersionId}
                                    workflowVersionId={workflowVersionId} />
                            ))}
                        </WorkflowVersionGrid>
                    )}
                </Section>
            </Container>
        </>
    );
}
