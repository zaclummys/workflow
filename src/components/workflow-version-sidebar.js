export function WorkflowVersionSidebar ({ children }) {
    return (
        <div className="flex flex-col fixed top-0 right-0 max-w-xl w-full h-screen bg-surface-high text-on-surface p-6 gap-4">
            {children}
        </div>
    );
}

export function WorkflowVersionSidebarContent ({ children}) {
    return (
        <div className="flex flex-col flex-grow gap-4 scrollbar-hidden">
            {children}
        </div>
    );
}

export function WorkflowVersionSidebarFooter ({children}) {
    return (
        <div className="flex flex-row justify-between gap-4">
            {children}
        </div>
    );
}

export function WorkflowVersionSidebarTitle ({ children }) {
    return (
        <span className="text-xl font-normal">
            {children}
        </span>
    );
}


