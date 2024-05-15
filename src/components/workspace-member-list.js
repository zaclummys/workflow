import getUserAction from "~/actions/get-user-action";

import UserColor from "~/components/user-color";

export function WorkspaceMemberList ({ children }) {
    return (
        <div className="flex flex-row -space-x-1">
            {children}
        </div>
    );
}

export async function WorkspaceMemberItem ({ member }) {
    const { user } = await getUserAction(member.userId);

    return (
        <UserColor
            className="w-6 h-6"
            user={user} />
    );
}