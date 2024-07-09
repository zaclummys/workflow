import Link from 'next/link';

import Header from "~/components/header";
import Container from "~/components/container";

import {
    Section,
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
    const { workflowExecution } = await getWorkflowExecutionAction(workflowExecutionId);

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
                                    Workflow Version
                                </DetailCellHeader>

                                <Link
                                    className="font-medium"
                                    href={`/workflow-version/${workflowExecution.workflowVersion.id}`}>
                                    {workflowExecution.workflowVersion.workflow.name} - Version {workflowExecution.workflowVersion.number}
                                </Link>
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>
                                    Workflow
                                </DetailCellHeader>

                                <Link
                                    className="font-medium"
                                    href={`/workflow/${workflowExecution.workflowVersion.workflow.id}`}>
                                    {workflowExecution.workflowVersion.workflow.name}
                                </Link>
                            </DetailCell>

                            <DetailCell>
                                <DetailCellHeader>
                                    Executed By
                                </DetailCellHeader>

                                <DetailCellText>
                                    {workflowExecution.executedBy.name}
                                </DetailCellText>
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
                        </DetailRow>
                    </Details>
                </Section>

                <Section>
                    <SectionTitle>
                        Execution Details
                    </SectionTitle>

                    {[
                        workflowExecution.inputValues,
                        workflowExecution.outputValues,
                    ].map(values => (
                        <div>
                            {values.map(value => (
                                <div>
                                    {value.toString()}
                                </div>
                            ))}
                        </div>
                    ))}
                </Section>
            </Container>
        </>
    );
}