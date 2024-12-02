import Link from 'next/link';

import Header from '~/components/header';
import Container from '~/components/container';

import {
    Section,
    SectionTitle,
} from '~/components/section';

import {
    Details,
    DetailRow,
    DetailCell,
    DetailCellHeader,
    DetailCellText,
} from '~/components/details';

import GoBack from '~/components/go-back';

import getWorkflowExecutionAction from '~/actions/get-workflow-execution-action';

import {
    Card,
    CardTitle,
} from '~/components/card';

export const title = 'Workflow Execution';

export default async function WorkflowExecution ({ params }) {
    const { workflowExecutionId } = await params;

    const { workflowExecution } = await getWorkflowExecutionAction(workflowExecutionId);

    return (
        <>
            <Header />

            <Container>
                <Section>
                    <SectionTitle>
                        <GoBack url={`/workflow-version/${workflowExecution.workflowVersion.id}`} />

                        Workflow Execution
                    </SectionTitle>

                    <Details>
                        <DetailRow>
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
                        </DetailRow>
                    </Details>
                </Section>

                <Section>
                    <SectionTitle>
                        Execution Details
                    </SectionTitle>

                    <div className="grid grid-cols-2 items-start gap-2">
                        {[
                            {
                                title: 'Inputs',
                                puts: workflowExecution.inputs,
                            },

                            {
                                title: 'Outputs',
                                puts: workflowExecution.outputs,
                            }
                        ].map(card => (
                            <Card
                                key={card.title}>
                                <CardTitle>
                                    {card.title}    
                                </CardTitle>

                                {card.puts.map(put => {
                                    if (put.type === 'boolean') {
                                        return (
                                            <span key={put.id}>
                                                <span className="font-medium">{put.name}</span> ({put.type}): {put.value ? 'true' : 'false'}
                                            </span>
                                        );
                                    } else {
                                        return (
                                            <span key={put.id}>
                                                <span className="font-medium">{put.name}</span> ({put.type}): {put.value}
                                            </span>
                                        );
                                    }
                                })}
                            </Card>
                        ))}
                    </div>
                </Section>
            </Container>
        </>
    );
}
