export function WorkspaceGrid ({ children }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {children}
        </div>
    );
}

export function WorkspaceGridItem ({ workspace }) {
    return (
        <div className="bg-surface rounded-lg p-4">
            <span>{workspace.name}</span>
            <span>{workspace.description}</span>

            <WorkspaceMemberList
                members={workspace.members} />
        </div>
    );
}

function WorkspaceMemberList ({ members }) {
    return (
        <div className="flex flex-row">
            {members.map(member => (
                <UserColor
                    key={member.id}
                    color={member.color} />
            ))}
        </div>
    );
}
