export function Sidebar ({ children }) {
    return (
        <div className="flex flex-col fixed top-0 right-0 max-w-xl w-full h-screen bg-surface-high text-on-surface p-6 gap-4">
            {children}
        </div>
    );
}

export function SidebarContent ({ children }) {
    return (
        <div className="flex flex-col flex-grow gap-4 scrollbar-hidden">
            {children}
        </div>
    );
}

export function SidebarFooter ({ children }) {
    return (
        <div className="flex flex-row justify-between gap-4">
            {children}
        </div>
    );
}

export function SidebarTitle ({ children }) {
    return (
        <span className="text-xl font-normal">
            {children}
        </span>
    );
}

export function SidebarHeader ({ children }) {
    return (
        <div className="flex flex-row justify-between">
            {children}
        </div>
    );
}


