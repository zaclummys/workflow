import UserColor from "~/components/user-color";

export default function WorkspaceMemberColorList({ members }) {
    return (
        <div className="flex flex-row -space-x-1">
            {members.map(member => (
                <UserColor
                    className="w-6 h-6"
                    key={member.user.id}
                    user={member.user} />
            ))}
        </div>
    );
}