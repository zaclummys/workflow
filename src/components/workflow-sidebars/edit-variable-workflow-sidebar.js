'use client';

import {
    useId,
    useState,
} from 'react';

import {
    PrimaryButton,
    OutlineButton,
} from '../button';


import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '../sidebar';

import VariableForm from '../variable-form';

export default function EditVariableWorkflowSidebar({
    variable,
    onCancelButtonClick,
    onSuccess,
}) {
    const [name, setName] = useState(variable.name);
    const [type, setType] = useState(variable.type);
    const [description, setDescription] = useState(variable.description);
    const [defaultValue, setDefaultValue] = useState(variable.defaultValue);
    const [markedAsInput, setMarkedAsInput] = useState(variable.markedAsInput);
    const [markedAsOutput, setMarkedAsOutput] = useState(variable.markedAsOutput);

    const [hasDefaultValue, setHasDefaultValue] = useState(defaultValue !== null);

    const formId = useId();

    const handleFormSubmit = event => {
        event.preventDefault();

        console.log({
            type,
            name,
            description,
            defaultValue,
            markedAsInput,
            markedAsOutput,
        });

        onSuccess();
    };

    const handleInputCheckboxChange = event => {
        setMarkedAsInput(event.target.checked);
    }

    const handleOutputCheckboxChange = event => {
        setMarkedAsOutput(event.target.checked);
    }

    const handleRemoveDefaultValueButtonClick = () => {
        setHasDefaultValue(false);
        setDefaultValue(null);
    };

    const handleAddDefaultValueButtonClick = () => {
        setHasDefaultValue(true);
    };

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    };

    const handleTypeChange = event => {        
        setType(event.target.value);
        setDefaultValue(null);
    };

    const handleDefaultValueChange = value => {
        setDefaultValue(value);
    };

    return (
        <Sidebar>
            <SidebarTitle>
                Edit Variable
            </SidebarTitle>

            <SidebarContent>
                <VariableForm
                    id={formId}
                    name={name}
                    description={description}
                    type={type}
                    defaultValue={defaultValue}
                    markedAsInput={markedAsInput}
                    markedAsOutput={markedAsOutput}
                    hasDefaultValue={hasDefaultValue}
                    onFormSubmit={handleFormSubmit}
                    onNameChange={handleNameChange}
                    onDescriptionChange={handleDescriptionChange}
                    onTypeChange={handleTypeChange}
                    onDefaultValueChange={handleDefaultValueChange}
                    onMarkedAsInputChange={handleInputCheckboxChange}
                    onMarkedAsOutputChange={handleOutputCheckboxChange}
                    onAddDefaultValueButtonClick={handleAddDefaultValueButtonClick}
                    onRemoveDefaultValueButtonClick={handleRemoveDefaultValueButtonClick} />                    
            </SidebarContent>

            <SidebarFooter>
                <OutlineButton
                    onClick={onCancelButtonClick}>
                    Cancel
                </OutlineButton>

                <PrimaryButton
                    form={formId}>
                    Save
                </PrimaryButton>
            </SidebarFooter>
        </Sidebar>
    );
}