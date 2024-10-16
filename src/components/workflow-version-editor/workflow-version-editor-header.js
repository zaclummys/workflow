import GoBack from '~/components/go-back';
import ButtonGroup from '~/components/button-group';
import WorkflowVersionStatus from "~/components/workflow-version-status";
import SaveWorkflowVersionButton from '~/components/save-workflow-version-button';
import ToggleWorkflowVersionButton from '~/components/toggle-workflow-version-button';

export default function WorkflowVersionEditorHeader ({
    localWorkflowVersion,
    localWorkflowVersionHasChanged,
    onSave,
}) {
    return (
        <header className="flex flex-row items-center bg-surface-high text-on-surface px-6 py-2 h-20">
            <div className="flex flex-row flex-grow gap-6">
                <GoBack url={`/workflow-version/${localWorkflowVersion.id}`} />

                <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-2">
                        <span>
                            Version {localWorkflowVersion.number}
                        </span>

                        <span className="text-on-surface-variant">/</span>

                        <span className="text-on-surface-variant">
                            {localWorkflowVersion.workflow.name}
                        </span>
                    </div>

                    <WorkflowVersionStatus
                        status={localWorkflowVersion.status}
                    />
                </div>
            </div>

            <ButtonGroup>
                <SaveWorkflowVersionButton
                    disabled={!localWorkflowVersionHasChanged}
                    workflowVersion={localWorkflowVersion}
                    onSave={onSave}
                />

                <ToggleWorkflowVersionButton
                    disabled={localWorkflowVersionHasChanged}
                    workflowVersion={localWorkflowVersion}
                />
            </ButtonGroup>
        </header>
    );
}