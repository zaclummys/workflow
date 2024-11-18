import WorkflowVariable from '~/core/domain/workflow-version/workflow-variable';
import WorkflowIfElement from '~/core/domain/workflow-version/elements/if/workflow-if-element';
import WorkflowCondition from '~/core/domain/workflow-version/elements/if/workflow-condition';

import {
    fromWorkflowCondition,
    fromWorkflowVariable,
    fromWorkflowIfElement,
} from './get-workflow-version';

describe('Get Workflow Version', () => {
    describe('Given a Workflow Condition', () => {
        it('Should convert', () => {
            const workflowCondition = new WorkflowCondition({
                id: '1',
                variableId: 'variable-2',
                variableType: 'string',
                operator: 'equal',
                operand: {
                    type: 'value',
                    value: {
                        type: 'string',
                        string: 'abc',
                    },
                }
            });

            const output = fromWorkflowCondition(workflowCondition);

            expect(output).toStrictEqual({
                id: '1',
                variableId: 'variable-2',
                operator: 'equal',
                operand: {
                    type: 'value',
                    value: {
                        type: 'string',
                        string: 'abc',
                    },
                }
            });
        });
    });

    describe('Given a Workflow If Element', () => {
        it('Should convert', () => {
            const workflowIfElement = new WorkflowIfElement({
                id: '1',
                name: 'Name',
                description: 'Description',
                strategy: 'any',
                conditions: [],
                nextElementIdIfTrue: '2',
                nextElementIdIfFalse: '3',
                positionX: 1,
                positionY: 2,
            });

            const output = fromWorkflowIfElement(workflowIfElement);

            expect(output).toStrictEqual({
                id: '1',
                type: 'if',
                name: 'Name',
                description: 'Description',
                conditions: [],
                strategy: 'any',
                nextElementIdIfTrue: '2',
                nextElementIdIfFalse: '3',
                positionX: 1,
                positionY: 2,
            });
        });
    });

    describe('Given a Workflow Variable', () => {
        describe('When there is no default value', () => {
            it('Should convert', () => {
                const workflowVariable = new WorkflowVariable({
                    id: '1',
                    name: 'Name',
                    description: 'Description',
                    type: 'string',
                    defaultValue: null,
                    markedAsInput: true,
                    markedAsOutput: true,
                });

                const output = fromWorkflowVariable(workflowVariable);

                expect(output).toStrictEqual({
                    id: '1',
                    name: 'Name',
                    description: 'Description',
                    type: 'string',
                    defaultValue: null,
                    markedAsInput: true,
                    markedAsOutput: true,
                });
            });
        });

        describe('When there is default value', () => {
            describe('And the default value is a string', () => {
                it('Should convert', () => {
                    const workflowVariable = new WorkflowVariable({
                        id: '1',
                        name: 'Name',
                        description: 'Description',
                        type: 'string',
                        defaultValue: {
                            type: 'string',
                            string: 'abc',
                        },
                        markedAsInput: true,
                        markedAsOutput: true,
                    });
    
                    const output = fromWorkflowVariable(workflowVariable);
    
                    expect(output).toStrictEqual({
                        id: '1',
                        name: 'Name',
                        description: 'Description',
                        type: 'string',
                        defaultValue: {
                            type: 'string',
                            string: 'abc',
                        },
                        markedAsInput: true,
                        markedAsOutput: true,
                    });
                });
            });

            describe('And the default value is a number', () => {
                it('Should convert', () => {
                    const workflowVariable = new WorkflowVariable({
                        id: '1',
                        name: 'Name',
                        description: 'Description',
                        type: 'number',
                        defaultValue: {
                            type: 'number',
                            number: 1,
                        },
                        markedAsInput: true,
                        markedAsOutput: true,
                    });
    
                    const output = fromWorkflowVariable(workflowVariable);
    
                    expect(output).toStrictEqual({
                        id: '1',
                        name: 'Name',
                        description: 'Description',
                        type: 'number',
                        defaultValue: {
                            type: 'number',
                            number: 1,
                        },
                        markedAsInput: true,
                        markedAsOutput: true,
                    });
                });
            });

            describe('And the default value is a boolean', () => {
                it('Should convert', () => {
                    const workflowVariable = new WorkflowVariable({
                        id: '1',
                        name: 'Name',
                        description: 'Description',
                        type: 'boolean',
                        defaultValue: {
                            type: 'boolean',
                            boolean: true,
                        },
                        markedAsInput: true,
                        markedAsOutput: true,
                    });
    
                    const output = fromWorkflowVariable(workflowVariable);
    
                    expect(output).toStrictEqual({
                        id: '1',
                        name: 'Name',
                        description: 'Description',
                        type: 'boolean',
                        defaultValue: {
                            type: 'boolean',
                            boolean: true,
                        },
                        markedAsInput: true,
                        markedAsOutput: true,
                    });
                });
            });
        });
    });
});