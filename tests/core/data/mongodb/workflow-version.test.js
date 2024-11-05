import {
    toWorkflowAssignment,
    fromWorkflowAssignment,

    fromWorkflowIfElement,

    toWorkflowElement,
    toWorkflowIfElement,
} from '~/core/data/mongodb/workflow-version';

import WorkflowIfElement from '~/core/domain/workflow-version/elements/if/workflow-if-element';
import WorkflowAssignment from '~/core/domain/workflow-version/elements/assign/workflow-assignment';

describe('Workflow Version', () => {
    describe('Given a Workflow Assignment', () => {
        describe('And operand is a variable', () => {
            it('Should serialize', () => {
                const output = toWorkflowAssignment({
                    id: '1',
                    operator: 'set',
                    variableId: '2',
                    operand: {
                        type: 'variable',
                        variableId: '3',
                    }
                });

                expect(output).toEqual(new WorkflowAssignment({
                    id: '1',
                    variableId: '2',
                    operator: 'set',
                    operand: {
                        type: 'variable',
                        variableId: '3',
                    },
                }));
            });

            it('Should deserialize', () => {
                const output = fromWorkflowAssignment(new WorkflowAssignment({
                    id: '1',
                    variableId: '2',
                    operator: 'set',
                    operand: {
                        type: 'variable',
                        variableId: '3',
                    },
                }));

                expect(output).toEqual({
                    id: '1',
                    operator: 'set',
                    variableId: '2',
                    operand: {
                        type: 'variable',
                        variableId: '3',
                    }
                });
            });
        });

        describe('And operand is a value', () => {
            it('Should serialize', () => {
                const output = toWorkflowAssignment({
                    id: '1',
                    operator: 'set',
                    variableId: '2',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'number',
                            number: 123,
                        }
                    }
                });

                expect(output).toEqual(new WorkflowAssignment({
                    id: '1',
                    variableId: '2',
                    operator: 'set',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'number',
                            number: 123,
                        }
                    },
                }));
            });

            it('Should deserialize', () => {
                const output = fromWorkflowAssignment(new WorkflowAssignment({
                    id: '1',
                    variableId: '2',
                    operator: 'set',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'number',
                            number: 123,
                        }
                    },
                }));

                expect(output).toEqual({
                    id: '1',
                    operator: 'set',
                    variableId: '2',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'number',
                            number: 123,
                        }
                    }
                });
            });
        });
    });


    describe('Workflow If Element', () => {
        describe('From', () => {
            it('Should convert', () => {
                const output = fromWorkflowIfElement(new WorkflowIfElement({
                    id: '1',
                    name: 'Name',
                    description: 'Description',
                    strategy: 'all',
                    conditions: [],
                    nextElementIdIfTrue: '2',
                    nextElementIdIfFalse: '3',
                    positionX: 1,
                    positionY: 2,
                }));

                expect(output).toEqual({
                    id: '1',
                    type: 'if',
                    name: 'Name',
                    description: 'Description',
                    conditions: [],
                    strategy: 'all',
                    nextElementIdIfTrue: '2',
                    nextElementIdIfFalse: '3',
                    positionX: 1,
                    positionY: 2,
                });
            });
        });

        describe('To', () => {
            it('Should convert', () => {
                const output = toWorkflowIfElement({
                    id: '1',
                    type: 'if',
                    name: 'Name',
                    description: 'Description',
                    conditions: [],
                    strategy: 'all',
                    nextElementIdIfTrue: '2',
                    nextElementIdIfFalse: '3',
                    positionX: 1,
                    positionY: 2,
                });

                expect(output).toEqual(new WorkflowIfElement({
                    id: '1',
                    name: 'Name',
                    description: 'Description',
                    strategy: 'all',
                    conditions: [],
                    nextElementIdIfTrue: '2',
                    nextElementIdIfFalse: '3',
                    positionX: 1,
                    positionY: 2,
                }));
            });
        });
    });

    describe('Workflow Element', () => {
        describe('To', () => {
            it('Should convert if', () => {
                const output = toWorkflowElement({
                    id: '1',
                    type: 'if',
                    name: 'Name',
                    description: 'Description',
                    conditions: [],
                    strategy: 'all',
                    nextElementIdIfTrue: '2',
                    nextElementIdIfFalse: '3',
                    positionX: 1,
                    positionY: 2,
                });

                expect(output).toEqual(new WorkflowIfElement({
                    id: '1',
                    name: 'Name',
                    description: 'Description',
                    strategy: 'all',
                    conditions: [],
                    nextElementIdIfTrue: '2',
                    nextElementIdIfFalse: '3',
                    positionX: 1,
                    positionY: 2,
                }));
            });
        })
    })
});