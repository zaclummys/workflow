import OutlineButton from "~/atoms/button/outline-button";
import PrimaryButton from "~/atoms/button/primary-button";

import Header from "~/organisms/header";

export default function WorkflowVersionTemplate ({
    workflowVersion
}) {
    return (
        <div>
            <Header />

            <div className="container mx-auto">
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <span className="page-title grow">
                            Workflow Version {workflowVersion.number}
                        </span>

                        <div className="flex flex-row gap-[var(--page-actions-gap)]">
                            <PrimaryButton>Open</PrimaryButton>
                            <OutlineButton>Execute</OutlineButton>
                            <OutlineButton>Delete</OutlineButton>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-[var(--page-section-gap)]">
                    <span className="page-section-title">
                        Workflows
                    </span>
                </div>
            </div>
        </div>
    );
}
