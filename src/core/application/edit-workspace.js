import { findSessionByToken } from "../data/mongodb/session";
import { findWorkspaceById, updateWorkspace } from "../data/mongodb/workspace";

export default async function editWorkspace ({ id, name, description, sessionToken }) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workspace = await findWorkspaceById(id);

    if (!workspace) {
        return {
            success: false,
        };
    }

    workspace.setName(name);
    workspace.setDescription(description);

    await updateWorkspace(workspace);

    return {
        success: true,
    };
}