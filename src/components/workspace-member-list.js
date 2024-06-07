import DateAgo from "~/components/date-ago";
import UserColor from "./user-color";
import RemoveMemberModalButton from "./modal-buttons/remove-member-modal-button";

export function WorkspaceMemberList({ children }) {
    return (
        <div className="flex flex-col gap-4">
            {children}
        </div>
    );
}

export function WorkspaceMemberItem ({
    member,
    workspace,
}) {
    const isOwner = workspace.createdBy.id === member.user.id;

    return (
        <div className="flex flex-row items-center">
            <div className="grid grid-cols-3 items-center flex-grow">
                <div className="flex flex-row items-center gap-4">
                    <UserColor
                        user={member.user}
                        className="w-8 h-8" />

                    <span>{member.user.name}</span>
                </div>

                <span className="text-sm text-on-surface-variant">
                    Added <DateAgo date={member.addedAt} />
                </span>

                {isOwner ? (
                    <span className="text-sm text-on-surface-variant">
                        Owner
                    </span>
                ) : (
                    <span className="text-sm text-on-surface-variant">
                        Guest
                    </span>            
                )}
            </div>

            <RemoveMemberModalButton
                disabled={isOwner}
                member={member}
                workspace={workspace} />
        </div>
    );
}