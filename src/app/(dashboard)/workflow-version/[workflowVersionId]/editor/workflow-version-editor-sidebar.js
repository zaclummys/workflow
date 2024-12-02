import IfElementSidebar from './sidebars/element-sidebars/if-element-sidebar/if-element-sidebar';
import AssignElementSidebar from './sidebars/element-sidebars/assign-element-sidebar/assign-element-sidebar';

import ShowVariablesSidebar from './sidebars/variable-sidebars/show-variables-sidebar';
import AddVariableSidebar from './sidebars/variable-sidebars/add-variable-sidebar';
import EditVariableSidebar from './sidebars/variable-sidebars/edit-variable-sidebar';
import RemoveVariableSidebar from './sidebars/variable-sidebars/remove-variable-sidebar';

export default function WorkflowVersionEditorSidebar ({
    sidebar,
    variables,

    onAddVariableButtonClick,
    onEditVariableButtonClick,
    onRemoveVariableButtonClick,
    onShowVariablesCloseButtonClick,

    onAddVariableConfirm,
    onAddVariableCancel,

    onEditVariableConfirm,
    onEditVariableCancel,

    onRemoveVariableConfirm,
    onRemoveVariableCancel,

    onEditElementConfirm,
    onEditElementCancel,

    dispatchWorflowVersionEditor,
}) {
    switch (sidebar.type) {
        case 'show-variables':
            return (
                <ShowVariablesSidebar
                    variables={variables}

                    onAddVariableButtonClick={onAddVariableButtonClick}
                    onEditVariableButtonClick={onEditVariableButtonClick}
                    onRemoveVariableButtonClick={onRemoveVariableButtonClick}

                    onCloseButtonClick={onShowVariablesCloseButtonClick}
                />
            );

        case 'add-variable':
            return (
                <AddVariableSidebar
                    onConfirm={onAddVariableConfirm}
                    onCancel={onAddVariableCancel}
                />
            );

        case 'edit-variable':
            return (
                <EditVariableSidebar
                    variable={sidebar.variable}
                    onConfirm={onEditVariableConfirm}
                    onCancel={onEditVariableCancel}
                />
            );

        case 'remove-variable':
            return (
                <RemoveVariableSidebar
                    variable={sidebar.variable}
                    onConfirm={onRemoveVariableConfirm}
                    onCancel={onRemoveVariableCancel}
                />
            );

        case 'edit-element':
            switch (sidebar.element.type) {
                case 'if':
                    return (
                        <IfElementSidebar
                            key={sidebar.element.id}

                            ifElement={sidebar.element}
                            variables={variables}

                            onConfirm={onEditElementConfirm}
                            onCancel={onEditElementCancel}
                        />
                    );

                case 'assign':
                    return (
                        <AssignElementSidebar
                            key={sidebar.element.id}

                            assignElement={sidebar.element}
                            variables={variables}
                            
                            onConfirm={onEditElementConfirm}
                            onCancel={onEditElementCancel}
                        />
                    );

                default:
                    return null;
            }
        
        default:
            return null;
    }
}