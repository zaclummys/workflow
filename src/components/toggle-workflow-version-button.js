'use client';

import { useState } from "react";

import {
    PrimaryButton,
    OutlineButton,
} from "./button";

import activateWorkflowVersionAction from "~/actions/activate-workflow-version-action";
import deactivateWorkflowVersionAction from "~/actions/deactivate-workflow-version-action";

export function ActivateWorkflowVersionButton ({ workflowVersionId }) {
    const [isActivating, setIsActivating] = useState(false);

    const onClick = async () => {
        setIsActivating(true);

        try {
            await activateWorkflowVersionAction(workflowVersionId);
        } finally {
            setIsActivating(false);
        }
    };

    return (
        <PrimaryButton
            disabled={isActivating}
            onClick={onClick}>
            Activate
        </PrimaryButton>
    );
}

export function DeactivateWorkflowVersionButton ({ workflowVersionId }) {
    const [isDeactivating, setIsDeactivating] = useState(false);

    const onClick = async () => {
        setIsDeactivating(true);

        try {
            await deactivateWorkflowVersionAction(workflowVersionId);
        } finally {
            setIsDeactivating(false);
        }
    };

    return (
        <OutlineButton
            disabled={isDeactivating}
            onClick={onClick}>
            Deactivate
        </OutlineButton>
    );
}