import { OutlineButton } from '~/components/button';

import GoBack from '~/components/go-back';
import ButtonGroup from '~/components/button-group';
import WorkflowVersionStatus from "~/components/workflow-version-status";
import SaveWorkflowVersionButton from '~/components/save-workflow-version-button';
import ToggleWorkflowVersionButton from '~/app/(dashboard)/(without-header)/workflow-version/[workflowVersionId]/editor/toggle-workflow-version-button';

import HelpWorkflowVersionModalButton from './help-workflow-version-modal-button';

export default function WorkflowVersionEditorHeader ({
    workflowVersion,
    disableSaveButton,
    disableToggleButton,
    onVariablesButtonClick,
}) {
    return (
        <header className="flex flex-row items-center bg-surface-high text-on-surface px-6 py-2 h-20">
            <div className="flex flex-row flex-grow gap-6">
                <GoBack url={`/workflow-version/${workflowVersion.id}`} />

                <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-2">
                        <span>
                            Version {workflowVersion.number}
                        </span>

                        <span className="text-on-surface-variant">/</span>

                        <span className="text-on-surface-variant">
                            {workflowVersion.workflow.name}
                        </span>
                    </div>

                    <WorkflowVersionStatus
                        status={workflowVersion.status}
                    />
                </div>
            </div>

            <ButtonGroup>
                <SaveWorkflowVersionButton
                    disabled={disableSaveButton}
                    workflowVersion={workflowVersion}
                />

                <OutlineButton onClick={onVariablesButtonClick}>
                    Variables
                </OutlineButton>

                <ToggleWorkflowVersionButton
                    disabled={disableToggleButton}
                    workflowVersion={workflowVersion}
                />

                <HelpWorkflowVersionModalButton />
            </ButtonGroup>
        </header>
    );
}