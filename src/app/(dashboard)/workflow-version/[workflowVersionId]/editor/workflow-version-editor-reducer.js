export default function workflowVersionEditorReducer (workflowVersionEditor, action) {
    return {
        ...workflowVersionEditor,
        workflowVersion: workflowVersionReducer(workflowVersionEditor.workflowVersion, action),
        workflowVersionSidebar: workflowVersionSidebarReducer(workflowVersionEditor.workflowVersionSidebar, action),
    }
}

function workflowVersionReducer (workflowVersion, action) {
    switch (action.type) {
        case 'reset':
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

        case 'edit-element-confirmed':
        case 'edit-element-canceled':
            return null;

        default:
            return workflowVersionSidebar;
    }
}

