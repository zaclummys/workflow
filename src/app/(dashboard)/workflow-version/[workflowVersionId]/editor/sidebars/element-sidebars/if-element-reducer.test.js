import ifElementReducer from './if-element-reducer';

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
                variableType: 'string',
            }
        );

        expect(output.conditions).toEqual([
            expect.objectContaining({
                id: 'condition-1',
                variableId: 'variable-1',
                variableType: 'string',
                operator: 'equal',
                operand: {
                    type: 'value',
                    value: {
                        type: 'string',
                        value: '',
                    },
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
                    variableType: 'string',
                    operator: 'concat',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'string',
                            value: 'xyz',
                        },
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
                variableType: 'number',
            }
        );

        expect(output.conditions).toEqual([
            expect.objectContaining({
                id: 'condition-1',
                variableId: 'variable-2',
                variableType: 'number',
                operator: 'equal',
                operand: {
                    type: 'value',
                    value: {
                        type: 'number',
                        value: '',
                    },
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
                    operand: {
                        type: 'value',
                        value: {
                            type: 'string',
                            string: 'Initial value',
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
                    variableId: '',
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
                        variableType: 'string',
                        operand: {
                            type: 'value',
                            value: {
                                type: 'string',
                                string: 'Initial value',
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
                        variableId: '',
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
                        variableType: 'string',
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
                    operandType: 'value',
                }
            );
    
            expect(output.conditions).toEqual([
                expect.objectContaining({
                    id: 'condition-1',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'string',
                            value: '',
                        },
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
                        variableType: 'string',
                        operand: {
                            type: 'value',
                            value: {
                                type: 'string',
                                string: 'Initial value',
                            },
                        },
                    },
                ],
            });
    
            const output = ifElementReducer(
                ifElementWithCondition,
                {
                    type: 'condition-operand-value-changed',
                    conditionId: 'condition-1',
                    value: 'New value',
                }
            );
    
            expect(output.conditions).toEqual([
                expect.objectContaining({
                    id: 'condition-1',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'string',
                            string: 'New value',
                        },
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
                        id: 'condition-1',
                        variableId: 'variable-1',
                        variableType: 'number',
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
                    operandType: 'value',
                }
            );
    
            expect(output.conditions).toEqual([
                expect.objectContaining({
                    id: 'condition-1',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'number',
                            value: '',
                        },
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
                        variableType: 'number',
                        operand: {
                            type: 'value',
                            value: {
                                type: 'number',
                                number: 'Initial value',
                            },
                        },
                    },
                ],
            });
    
            const output = ifElementReducer(
                ifElementWithCondition,
                {
                    type: 'condition-operand-value-changed',
                    conditionId: 'condition-1',
                    value: 'New value',
                }
            );
    
            expect(output.conditions).toEqual([
                expect.objectContaining({
                    id: 'condition-1',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'number',
                            number: 'New value',
                        },
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
                variableId: 'variable-2',
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