import { findSessionByToken } from "../data/mongodb/session";
import { findUserByEmail } from "../data/mongodb/user"
import { 
    findWorkspaceById,
    updateWorkspace,
} from "../data/mongodb/workspace";

export default async function addMemberToWorkspace ({
    email,
    workspaceId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace || !workspace.isMember(session.getUserId())) {
        return {
            success: false,
        }
    }

    const user = await findUserByEmail(email);

    if (!user) {
        return {
            success: false,
            message: 'User not found.',
        }
    }

    if (workspace.isMember(user.getId())) {
        return {
            success: false,
            message: 'User is already a member of the workspace.',
        }
    }

    workspace.addMember(user.getId());

    await updateWorkspace(workspace);

    return {
        success: true,
    }
}