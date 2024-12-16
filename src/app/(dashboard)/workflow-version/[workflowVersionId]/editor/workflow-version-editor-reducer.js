export default function workflowVersionEditorReducer (workflowVersionEditor, action) {
    return {
        ...workflowVersionEditor,
        workflowVersion: workflowVersionReducer(workflowVersionEditor.workflowVersion, action),
        workflowVersionSidebar: workflowVersionSidebarReducer(workflowVersionEditor.workflowVersionSidebar, action),
    }
}

function workflowVersionVariablesReducer (variables, action) {
    switch (action.type) {
        case 'workflow-version-reseted':
            return action.workflowVersion.variables;
            
        case 'add-variable-confirmed':
            return variables.concat(action.addedVariable);

        case 'edit-variable-confirmed':
            return variables.map(variable => {
                if (variable.id === action.editedVariable.id) {
                    return {
                        ...variable,
                        ...action.editedVariable,
                    };
                } else {
                    return variable;
                }
            });

        case 'remove-variable-confirmed':
            return variables.filter(variable => {
                return variable.id !== action.removedVariable.id;
            });

        default:
            return variables;
    }
}

function workflowVersionElementsReducer (elements, action) {
    switch (action.type) {
        case 'workflow-version-reseted':
            return action.workflowVersion.elements;

        case 'element-added':
            return elements.concat(action.element);

        case 'element-moved':
            return elements.map(element => {
                if (element.id === action.elementId) {
                    return {
                        ...element,
                        positionX: action.positionX,
                        positionY: action.positionY,
                    }
                } else {
                    return element;
                }
            });

        case 'element-connected':
            return elements.map(element => {
                if (element.id === action.sourceElementId) {
                    switch (element.type) {
                        case 'start':
                            return {
                                ...element,
                                nextElementId: action.targetElementId,
                            };
                            
                        case 'assign':
                            return {
                                ...element,
                                nextElementId: action.targetElementId,
                            };

                        case 'if':
                            switch (action.connectionType) {
                                case 'true':
                                    return {
                                        ...element,
                                        nextElementIdIfTrue: action.targetElementId,
                                    };

                                case 'false':
                                    return {
                                        ...element,
                                        nextElementIdIfFalse: action.targetElementId,
                                    };

                                default:
                                    return element;
                            }

                        default:
                            return element;
                    }
                } else {
                    return element;
                }
            });

        case 'element-disconnected':
            return elements.map(element => {
                if (element.id === action.elementId) {
                    switch (element.type) {
                        case 'start':
                        case 'assign':
                            return {
                                ...element,
                                nextElementId: null,
                            };

                        case 'if':
                            switch (action.connectionType) {
                                case 'true':
                                    return {
                                        ...element,
                                        nextElementIdIfTrue: null,
                                    };

                                case 'false':
                                    return {
                                        ...element,
                                        nextElementIdIfFalse: null,
                                    };

                                default:
                                    return element;
                            }

                        default:
                            return element;
                    }
                } else {
                    return element;
                }
            });

        case 'edit-element-confirmed':
            return elements.map(element => {
                if (element.id === action.editedElement.id) {
                    return {
                        ...element,
                        ...action.editedElement,
                    }
                } else {
                    return element;
                }
            });

        case 'element-removed':
            return elements.filter(element => {
                return element.id !== action.elementId;
            });

        default:
            return elements;
    }
}

function workflowVersionReducer (workflowVersion, action) {
    switch (action.type) {
        case 'workflow-version-reseted':
            return action.workflowVersion;

        default:
            return {
                ...workflowVersion,
                variables: workflowVersionVariablesReducer(workflowVersion.variables, action),
                elements: workflowVersionElementsReducer(workflowVersion.elements, action),
            };
    }
}

function workflowVersionReducer2 (workflowVersion, action) {
    switch (action.type) {
        case 'workflow-version-reseted':
            return action.workflowVersion;
            
        case 'add-variable-confirmed':
            return {
                ...workflowVersion,
                variables: workflowVersion.variables.concat(action.addedVariable),
            };

        case 'edit-variable-confirmed':
            return {
                ...workflowVersion,
                variables: workflowVersion.variables.map(variable => {
                    if (variable.id === action.editedVariable.id) {
                        return {
                            ...variable,
                            ...action.editedVariable,
                        };
                    } else {
                        return variable;
                    }
                }),
            };

        case 'remove-variable-confirmed':
            return {
                ...workflowVersion,
                variables: workflowVersion.variables.filter(variable => {
                    return variable.id !== action.removedVariable.id;
                }),
            };
        
        case 'element-added':
            return {
                ...workflowVersion,
                elements: workflowVersion.elements.concat(action.element),
            };

        case 'element-moved':
            return {
                ...workflowVersion,
                elements: workflowVersion.elements.map(element => {
                    if (element.id === action.elementId) {
                        return {
                            ...element,
                            positionX: action.positionX,
                            positionY: action.positionY,
                        }
                    } else {
                        return element;
                    }
                }),
            };

        case 'element-connected':
            return {
                ...workflowVersion,
                elements: workflowVersion.elements.map(element => {
                    if (element.id === action.sourceElementId) {
                        switch (element.type) {
                            case 'start':
                                return {
                                    ...element,
                                    nextElementId: action.targetElementId,
                                };
                                
                            case 'assign':
                                return {
                                    ...element,
                                    nextElementId: action.targetElementId,
                                };

                            case 'if':
                                switch (action.connectionType) {
                                    case 'true':
                                        return {
                                            ...element,
                                            nextElementIdIfTrue: action.targetElementId,
                                        };

                                    case 'false':
                                        return {
                                            ...element,
                                            nextElementIdIfFalse: action.targetElementId,
                                        };

                                    default:
                                        return element;
                                }

                            default:
                                return element;
                        }
                    } else {
                        return element;
                    }
                }),
            };

        case 'element-disconnected':
            return {
                ...workflowVersion,
                elements: workflowVersion.elements.map(element => {
                    if (element.id === action.sourceElementId) {
                        switch (element.type) {
                            case 'start':
                                return {
                                    ...element,
                                    nextElementId: null,
                                };

                            case 'assign':
                                return {
                                    ...element,
                                    nextElementId: null,
                                };

                            case 'if':
                                switch (action.connectionType) {
                                    case 'true':
                                        return {
                                            ...element,
                                            nextElementIdIfTrue: null,
                                        };

                                    case 'false':
                                        return {
                                            ...element,
                                            nextElementIdIfFalse: null,
                                        };

                                    default:
                                        return element;
                                }
                        }
                    } else {
                        return element;
                    }
                }),
            };

        case 'edit-element-confirmed':
            return {
                ...workflowVersion,
                elements: workflowVersion.elements.map(element => {
                    if (element.id === action.editedElement.id) {
                        return {
                            ...element,
                            ...action.editedElement,
                        }
                    } else {
                        return element;
                    }
                })
            };

        case 'element-removed':
            return {
                ...workflowVersion,
                elements: workflowVersion.elements.filter(element => {
                    return element.id !== action.elementId;
                }),
            };

        default:
            return workflowVersion;
    }
}

function workflowVersionSidebarReducer (workflowVersionSidebar, action) {
    switch (action.type) {
        case 'show-variables-sidebar-opened':
        case 'add-variable-confirmed':
        case 'add-variable-canceled':
        case 'edit-variable-confirmed':
        case 'edit-variable-canceled':
        case 'remove-variable-confirmed':
        case 'remove-variable-canceled':
            return {
                type: 'show-variables',
            };
        
        case 'show-variables-sidebar-closed':
            return null;

        case 'add-variable-sidebar-opened':
            return {
                type: 'add-variable',
            };

        case 'edit-variable-sidebar-opened':
            return {
                type: 'edit-variable',
                variable: action.variable,
            };

        case 'remove-variable-sidebar-opened':
            return {
                type: 'remove-variable',
                variable: action.variable,
            };

        case 'element-selected':
            return {
                type: 'edit-element',
                element: action.element,
            };

        case 'element-removed':
            if (workflowVersionSidebar.type === 'edit-element' && workflowVersionSidebar.element.id === action.elementId) {
                return null;
            } else {
                return workflowVersionSidebar;
            }

        case 'edit-element-confirmed':
        case 'edit-element-canceled':
            return null;

        default:
            return workflowVersionSidebar;
    }
}

