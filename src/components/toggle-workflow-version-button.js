'use client';

import { useState } from "react";

import {
    PrimaryButton,
    OutlineButton,
} from "./button";

import activateWorkflowVersionAction from "~/actions/activate-workflow-version-action";
import deactivateWorkflowVersionAction from "~/actions/deactivate-workflow-version-action";

export default function ToggleWorkflowVersionButton ({
    disabled,
    workflowVersion,
}) {
    switch (workflowVersion.status) {
        case 'active':
            return (
                <DeactivateWorkflowVersionButton
                    disabled={disabled}
                    workflowVersionId={workflowVersion.id}
                />
            );

        case 'draft':
        case 'inactive':
            return (
                <ActivateWorkflowVersionButton
                    disabled={disabled}
                    workflowVersionId={workflowVersion.id}
                />
            );

        default:
            return null;
    }
}

function ActivateWorkflowVersionButton ({
    disabled,
    workflowVersionId,
}) {
    const [isActivating, setIsActivating] = useState(false);

    const handleActivateButtonClick = async () => {
        setIsActivating(true);

        try {
            await activateWorkflowVersionAction(workflowVersionId);
        } finally {
            setIsActivating(false);
        }
    };

    return (
        <PrimaryButton
            disabled={isActivating || disabled}
            onClick={handleActivateButtonClick}
        >
            Activate
        </PrimaryButton>
    );
}

function DeactivateWorkflowVersionButton ({
    disabled,
    workflowVersionId,
}) {
    const [isDeactivating, setIsDeactivating] = useState(false);

    const handleDeactivateButtonClick = async () => {
        setIsDeactivating(true);

        try {
            await deactivateWorkflowVersionAction(workflowVersionId);
        } finally {
            setIsDeactivating(false);
        }
    };

    return (
        <PrimaryButton
            disabled={isDeactivating || disabled}
            onClick={handleDeactivateButtonClick}
        >
            Deactivate
        </PrimaryButton>
    );
}