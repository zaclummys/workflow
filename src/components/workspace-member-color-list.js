import getUserAction from "~/actions/get-user-action";
import UserColor from "~/components/user-color";

export function WorkspaceMemberColorList ({ children }) {
    return (
        <div className="flex flex-row -space-x-1">
            {children}
        </div>
    );
}

export async function WorkspaceMemberColorItem ({ member }) {
    return (
        <UserColor
            className="w-6 h-6"
            user={member.user} />
    );
}