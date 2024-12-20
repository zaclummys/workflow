import ifElementReducer from './if-element-sidebar-reducer';

describe('If Element Reducer', () => {
    const createIfElement = ({
        conditions = [],
    } = {}) => {
        return {
            name: 'Initial name',
            description: 'Initial description',
            strategy: 'all',
            conditions,
        };
    }

    it('Should return the initial state', () => {
        const ifElement = createIfElement();

        const output = ifElementReducer(ifElement, { type: 'unknown' });

        expect(output).toEqual(ifElement);
    });


    it('Should change the name', () => {
        const ifElement = createIfElement();

        const output = ifElementReducer(ifElement, { type: 'name-changed', name: 'New name' });

        expect(output).toEqual(
            expect.objectContaining({
                name: 'New name',
            })
        );
    });

    it('Should change the description', () => {
        const ifElement = createIfElement();

        const output = ifElementReducer(ifElement, { type: 'description-changed', description: 'New description' });

        expect(output).toEqual(
            expect.objectContaining({
                description: 'New description',
            })
        );
    });

    it('Should change the strategy', () => {
        const ifElement = createIfElement();

        const output = ifElementReducer(ifElement, { type: 'strategy-changed', strategy: 'any' });

        expect(output).toEqual(
            expect.objectContaining({
                strategy: 'any',
            })
        );
    });

    it('Should add a condition', () => {
        const ifElement = createIfElement();

        const output = ifElementReducer(
            ifElement,
            {
                type: 'condition-added', 
                conditionId: 'condition-1',
                variableId: 'variable-1',
            }
        );

        expect(output.conditions).toEqual([
            expect.objectContaining({
                id: 'condition-1',
                variableId: 'variable-1',
                operator: 'equal',
                operand: {
                    type: 'variable',
                    variableId: 'variable-1',
                },
            })
        ]);
    });

    it('Should change a condition variable', () => {
        const ifElementWithCondition = createIfElement({
            conditions: [
                {
                    id: 'condition-1',
                    variableId: 'variable-1',
                    operator: 'concat',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'string',
                            value: 'abc',
                        }
                    },
                },
            ],
        });

        const output = ifElementReducer(
            ifElementWithCondition,
            {
                type: 'condition-variable-changed',
                conditionId: 'condition-1',
                variableId: 'variable-2',
            }
        );

        expect(output.conditions).toEqual([
            expect.objectContaining({
                id: 'condition-1',
                variableId: 'variable-2',
                operator: 'equal',
                operand: {
                    type: 'variable',
                    variableId: 'variable-2',
                }
            })
        ]);
    });

    it('Should change a condition operator', () => {
        const ifElementWithCondition = createIfElement({
            conditions: [
                {
                    id: 'condition-1',
                    operator: 'equal',
                },
            ],
        });

        const output = ifElementReducer(
            ifElementWithCondition,
            {
                type: 'condition-operator-changed',
                conditionId: 'condition-1',
                operator: 'not-equal',
            }
        );

        expect(output.conditions).toEqual([
            expect.objectContaining({
                id: 'condition-1',
                operator: 'not-equal',
            })
        ]);
    });

    it('Should change a condition operand type to variable', () => {
        const ifElementWithCondition = createIfElement({
            conditions: [
                {
                    id: 'condition-1',
                    variableId: 'variable-1',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'string',
                            value: 'abc',
                        },
                    },
                },
            ],
        });

        const output = ifElementReducer(
            ifElementWithCondition,
            {
                type: 'condition-operand-type-changed',
                conditionId: 'condition-1',
                operandType: 'variable',
            }
        );

        expect(output.conditions).toEqual([
            expect.objectContaining({
                id: 'condition-1',
                operand: {
                    type: 'variable',
                    variableId: 'variable-1',
                },
            })
        ]);
    });

    describe('When variable type is string', () => {
        it('Should change a condition operand type to variable', () => {
            const ifElementWithCondition = createIfElement({
                conditions: [
                    {
                        id: 'condition-1',
                        variableId: 'variable-1',
                        operand: {
                            type: 'value',
                            value: 'abc',
                        },
                    },
                ],
            });
    
            const output = ifElementReducer(
                ifElementWithCondition,
                {
                    type: 'condition-operand-type-changed',
                    conditionId: 'condition-1',
                    operandType: 'variable',
                }
            );
    
            expect(output.conditions).toEqual([
                expect.objectContaining({
                    id: 'condition-1',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-1',
                    },
                })
            ]);
        });

        it('Should change a condition operand type to value', () => {
            const ifElementWithCondition = createIfElement({
                conditions: [
                    {
                        id: 'condition-1',
                        variableId: 'variable-1',
                        operand: {
                            type: 'variable',
                            variableId: 'variable-1',
                        },
                    },
                ],
            });
    
            const output = ifElementReducer(
                ifElementWithCondition,
                {
                    type: 'condition-operand-type-changed',
                    conditionId: 'condition-1',
                    variableType: 'string',
                    operandType: 'value',
                }
            );
    
            expect(output.conditions).toEqual([
                expect.objectContaining({
                    id: 'condition-1',
                    operand: {
                        type: 'value',
                        value: '',
                    },
                })
            ]);
        });

        it('Should change the condition operand value', () => {
            const ifElementWithCondition = createIfElement({
                conditions: [
                    {
                        id: 'condition-1',
                        variableId: 'variable-1',
                        operand: {
                            type: 'value',
                            value: {
                                type: 'string',
                                value: 'abc',
                            }
                        },
                    },
                ],
            });
    
            const output = ifElementReducer(
                ifElementWithCondition,
                {
                    type: 'condition-operand-value-changed',
                    conditionId: 'condition-1',
                    value: 'xyz',
                }
            );
    
            expect(output.conditions).toEqual([
                expect.objectContaining({
                    id: 'condition-1',
                    operand: {
                        type: 'value',
                        value: 'xyz',
                    },
                })
            ]);
        });
    });

    describe('When variable type is number', () => {
        it('Should change a condition operand type to value', () => {
            const ifElementWithCondition = createIfElement({
                conditions: [
                    {
                        id: 'condition-number',
                        variableId: 'variable-number',
                        operand: {
                            type: 'variable',
                            variableId: 'variable-number',
                        },
                    },
                ],
            });
    
            const output = ifElementReducer(
                ifElementWithCondition,
                {
                    type: 'condition-operand-type-changed',
                    conditionId: 'condition-number',
                    variableType: 'number',
                    operandType: 'value',
                }
            );
    
            expect(output.conditions).toEqual([
                expect.objectContaining({
                    id: 'condition-number',
                    operand: {
                        type: 'value',
                        value: '0',
                    },
                })
            ]);
        });

        it('Should change the condition operand value', () => {
            const ifElementWithCondition = createIfElement({
                conditions: [
                    {
                        id: 'condition-1',
                        variableId: 'variable-1',
                        operand: {
                            type: 'value',
                            value: {
                                type: 'number',
                                value: '123',
                            }
                        },
                    },
                ],
            });
    
            const output = ifElementReducer(
                ifElementWithCondition,
                {
                    type: 'condition-operand-value-changed',
                    conditionId: 'condition-1',
                    value: '456',
                }
            );

            expect(output.conditions).toEqual([
                expect.objectContaining({
                    id: 'condition-1',
                    operand: {
                        type: 'value',
                        value: '456',
                    },
                })
            ]);
        });
    });

    it('Should change a condition operand variable', () => {
        const ifElementWithCondition = createIfElement({
            conditions: [
                {
                    id: 'condition-1',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-1',
                    },
                },
            ],
        });

        const output = ifElementReducer(
            ifElementWithCondition,
            {
                type: 'condition-operand-variable-changed',
                conditionId: 'condition-1',
                operandVariableId: 'variable-2',
            }
        );

        expect(output.conditions).toEqual([
            expect.objectContaining({
                id: 'condition-1',
                operand: {
                    type: 'variable',
                    variableId: 'variable-2',
                },
            })
        ]);
    });

    

    it('Should remove a condition', () => {
        const ifElementWithCondition = createIfElement({
            conditions: [
                {
                    id: 'condition-1',
                },
            ],
        });

        const output = ifElementReducer(
            ifElementWithCondition,
            {
                type: 'condition-removed',
                conditionId: 'condition-1',
            }
        );

        expect(output.conditions).toEqual([]);
    });

    it('Should remove a condition and keep the other conditions', () => {
        const ifElementWithConditions = createIfElement({
            conditions: [
                {
                    id: 'condition-1',
                },
                {
                    id: 'condition-2',
                },
            ],
        });

        const output = ifElementReducer(
            ifElementWithConditions,
            {
                type: 'condition-removed',
                conditionId: 'condition-1',
            }
        );

        expect(output.conditions).toEqual([
            expect.objectContaining({
                id: 'condition-2',
            })
        ]);
    });
});