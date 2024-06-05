'use client';

import { useState } from 'react';

import { OutlineButton, PrimaryButton } from '~/components/button';

import {
    Modal,
    ModalTitle,
    ModalFooter,
    ModalSubtitle,
} from '~/components/modal';

import {
    Form,
    Field,
    Label,
    Input,
} from '~/components/form';

import {
    ManageWorkspaceMemberList,
    ManageWorkspaceMemberItem,
} from '~/components/manage-workspace-member-list';

export default function ManageMembersModalButton({ workspace }) {
    const [isOpen, setIsOpen] = useState(false);

    const onManageMembersButtonClick = () => {
        setIsOpen(true);
    };

    const onCloseButtonClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <OutlineButton
                onClick={onManageMembersButtonClick}>
                Manage Members
            </OutlineButton>

            {isOpen && (
                <Modal>
                    <ModalTitle>
                        Manage Members
                    </ModalTitle>

                    <span>
                        Workspace members have full access to workflows, workflow versions and workflow executions.
                    </span>

                    <ModalSubtitle>
                        Add member
                    </ModalSubtitle>

                    <AddMemberForm />

                    <ModalSubtitle>
                        Members
                    </ModalSubtitle>

                    <ManageWorkspaceMemberList>
                        {workspace.members.map((member) => (
                            <ManageWorkspaceMemberItem
                                key={member.user.id}
                                member={member}
                                workspace={workspace} />
                        ))}
                    </ManageWorkspaceMemberList>

                    <ModalFooter>
                        <OutlineButton
                            onClick={onCloseButtonClick}>
                            Close
                        </OutlineButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}

function AddMemberForm () {
    const onSubmit = event => {
        event.preventDefault();

        console.log(event)
    };

    return (
        <Form
            className="flex-row items-end"
            onSubmit={onSubmit}>
            <Field>
                <Label>
                    Email
                </Label>

                <Input
                    type="email" />
            </Field>

            <OutlineButton
                type="submit">
                Add
            </OutlineButton>
        </Form>
    );
}