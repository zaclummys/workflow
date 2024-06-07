'use client';

import { useState } from 'react';

import { OutlineButton } from '~/components/button';

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

import Error from '~/components/error';

import {
    WorkspaceMemberList,
    WorkspaceMemberItem,
} from '~/components/workspace-member-list';

import addMemberToWorkspaceAction from '~/actions/add-member-to-workspace-action';

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

                    <AddMemberForm
                        workspaceId={workspace.id} />

                    <ModalSubtitle>
                        Members
                    </ModalSubtitle>

                    <WorkspaceMemberList>
                        {workspace.members.map((member) => (
                            <WorkspaceMemberItem
                                key={member.user.id}
                                member={member}
                                workspace={workspace} />
                        ))}
                    </WorkspaceMemberList>

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

function AddMemberForm({ workspaceId }) {
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);

    const [email, setEmail] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        setIsAdding(true);
        setError(null);

        const { success, message } = await addMemberToWorkspaceAction({
            email: email,
            workspaceId: workspaceId,
        });

        if (success) {
            setEmail('');
        } else {
            setError(message);
        }

        setIsAdding(false);
    };

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <Form
            onSubmit={onSubmit}>
            <div className="flex flex-row items-end gap-4">
                <Field>
                    <Label>
                        Email
                    </Label>

                    <Input
                        disabled={isAdding}
                        required
                        type="email"
                        value={email}
                        onChange={onEmailChange} />
                </Field>

                <OutlineButton
                    disabled={isAdding}
                    type="submit">
                    Add
                </OutlineButton>
            </div>

            {error && (
                <Error>
                    {error}
                </Error>
            )}
        </Form>
    );
}