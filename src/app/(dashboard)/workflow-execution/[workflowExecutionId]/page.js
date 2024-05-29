import Header from "~/components/header";
import Container from "~/components/container";

import {
    Section,
    SectionHeader,
    SectionTitle,
} from "~/components/section";

import {
    Details,
    DetailRow,
    DetailCell,
    DetailCellHeader,
    DetailCellText,
} from "~/components/details";

import WorkflowExecutionStatus from "~/components/workflow-execution-status";
import DateAgo from "~/components/date-ago";

import getWorkflowExecutionAction from "~/actions/get-workflow-execution-action";

export const title = 'Workflow Execution';

export default async function WorkflowExecution ({ params: { workflowExecutionId } }) {
    const workflowExecution = await getWorkflowExecutionAction(workflowExecutionId);

    return (
        <>
            <Header />

            <Container>
                <Section>
                    <SectionTitle>
                        Workflow Execution
                    </SectionTitle>

                    <Details>
                        <DetailRow>

                            <DetailCell>
                                <DetailCellHeader>
                                    Status
                                </DetailCellHeader>

                                <WorkflowExecutionStatus
                                    status={workflowExecution.status} />
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>
                                    Started At
                                </DetailCellHeader>

                                <DateAgo
                                    date={workflowExecution.startedAt} />
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>
                                    Finished At
                                </DetailCellHeader>

                                <DateAgo
                                    date={workflowExecution.finishedAt} />
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>
                                    Executed By
                                </DetailCellHeader>

                                <DetailCellText>
                                    {workflowExecution.executedById}
                                </DetailCellText>
                            </DetailCell>
                        </DetailRow>
                    </Details>
                </Section>
            </Container>
        </>
    );
}
