import {
    OutlineButton
} from "~/components/button";


import DateAgo from "~/components/date-ago";
import UserColor from "./user-color";
import RemoveMemberModalButton from "./modal-buttons/remove-member-modal-button";

export function ManageWorkspaceMemberList({ children }) {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    );
}

export function ManageWorkspaceMemberItem ({
    member,
    workspace,
}) {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-4">
                <UserColor
                    user={member.user}
                    className="w-8 h-8" />

                <span>{member.user.name}</span>
            </div>

            <span className="text-on-surface-variant">
                Added <DateAgo date={member.addedAt} />
            </span>

            <RemoveMemberModalButton
                member={member}
                workspace={workspace} />
        </div>
    );
}