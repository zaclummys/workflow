export default function workflowVersionReducer (workflowVersion, action) {
    switch (action.type) {
        case 'variable-added':
            return {
                ...workflowVersion,
                variables: workflowVersion.variables.concat(action.variable),
            };

        case 'variable-edited':
            return {
                ...workflowVersion,
                variables: workflowVersion.variables.map(variable => {
                    if (variable.id === action.variable.id) {
                        return {
                            ...variable,
                            ...action.variable,
                        };
                    } else {
                        return variable;
                    }
                }),
            };

        case 'variable-removed':
            return {
                ...workflowVersion,
                variables: workflowVersion.variables.filter(variable => {
                    return variable.id !== action.variableId;
                }),
            };
        
        case 'element-added':
            return {
                ...workflowVersion,
                elements: workflowVersion.elements.concat(action.element),
            };

        case 'element-edited':
            return {
                ...workflowVersion,
                elements: workflowVersion.elements.map(element => {
                    if (element.id === action.element.id) {
                        return {
                            ...element,
                            ...action.element,
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