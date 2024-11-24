'use client';

import {
    useState,
} from "react";

import {
    PrimaryButton,
    OutlineButton,
} from "../button";

import {
    Modal,
    ModalFooter,
    ModalTitle,
} from "../modal";

import Error from "../error";

import useNavigation from "~/hooks/use-navigation";

import executeWorkflowVersionAction from "~/actions/execute-workflow-version-action";
import ExecuteWorkflowVersionModal from '~/components/modals/execute-workflow-version-modal';

const defaultError = 'An unexpected error ocurred.';

export default function ExecuteWorkflowVersionModalButton({
    workflowVersion,
}) {
    const [opened, setOpened] = useState(false);
    const [executing, setExecuting] = useState(false);

    const { navigateToWorkflowExecution } = useNavigation();

    const handleExecuteButtonClick = () => {
        setOpened(true);
    };

    const handleCancel = () => {
        setOpened(false);
    };

    const handleConfirm = async (inputs) => {
        setExecuting(true);

        try {
            const { success, workflowExecutionId } = await executeWorkflowVersionAction({
                inputs,
                workflowVersionId: workflowVersion.id,
            });

            if (success && workflowExecutionId) {
                navigateToWorkflowExecution(workflowExecutionId);
            } else {
                setExecuting(false);
            }
        } catch {
            setExecuting(false);
        }
    }

    return (
        <>
            {workflowVersion.status === 'active' ? (
                <OutlineButton
                    onClick={handleExecuteButtonClick}>
                    Execute
                </OutlineButton>
            ) : (
                <OutlineButton
                    disabled>
                    Execute
                </OutlineButton>
            )}

            {opened && (
                <ExecuteWorkflowVersionModal
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    executing={executing}
                    workflowVersion={workflowVersion}
                />
            )}
        </>
    );
}


// function WorkflowVariablesForm({
//     id,
//     workflowVersion,
// }) {
//     const inputVariables = workflowVersion.variables
//         .filter(variable => variable.markedAsInputOption);

//     const extractInputValuesFromForm = (form) => {
//         return inputVariables.map(variable => {
//             const element = form.elements[variable.id];

//             if (!element) {
//                 throw new Error(`Element not found for variable: ${variable.id}`);
//             }

//             const value = extractInputValueFromInputElement(element);

//             return {
//                 id: variable.id,
//                 value,
//             };
//         });
//     }

//     const extractInputValueFromInputElement = (element) => {
//         switch (element.type) {
//             case 'checkbox':
//                 return element.checked;

//             case 'number':
//                 return parseInt(element.value);

//             case 'text':
//                 return element.value;

//             default:
//                 throw new Error(`Invalid element type: ${element.type}`);
//         }
//     };

//     const onFormSubmit = async (event) => {
//         event.preventDefault();

//         const inputValues = extractInputValuesFromForm(event.target);

//         await executeWorkflowVersionAction({
//             workflowVersionId: workflowVersion.id,
//             inputValues: inputValues,
//         });
//     };

//     return (
//         <Form
//             id={id}
//             onSubmit={onFormSubmit}>
//             {inputVariables.map(variable => (
//                 <WorkflowVariableField
//                     key={variable.id}
//                     variable={variable} />
//             ))}
//         </Form>
//     )
// }

// function WorkflowVariableField({
//     variable,
//     onValueChange,
// }) {
//     const id = useId();

//     switch (variable.type) {
//         case 'string':
//             return (
//                 <Field>
//                     <Label htmlFor={id}>
//                         {variable.name} (string)
//                     </Label>

//                     <Input
//                         id={id}
//                         name={variable.id}
//                         onChange={event => onValueChange(event.target.value)}
//                         type="text"
//                         placeholder={variable.defaultValue} />
//                 </Field>
//             );

//         case 'number':
//             return (
//                 <Field>
//                     <Label htmlFor={id}>
//                         {variable.name} (number)
//                     </Label>

//                     <Input
//                         id={id}
//                         name={variable.id}
//                         onChange={event => onValueChange(parseInt(event.target.value))}
//                         type="number"
//                         step="1"
//                         placeholder={variable.defaultValue} />
//                 </Field>
//             );

//         case 'boolean':
//             return (
//                 <Field>
//                     <Label htmlFor={id}>
//                         {variable.name}
//                     </Label>

//                     <div className="flex flex-row items-center gap-2">
//                         <Checkbox
//                             id={id}
//                             name={variable.id}
//                             onChange={event => onValueChange(event.target.checked)}
//                             defaultChecked={variable.defaultValue} />

//                         <span>
//                             {variable.description}
//                         </span>
//                     </div>
//                 </Field>
//             );

//         default:
//             return null;
//     }
// }