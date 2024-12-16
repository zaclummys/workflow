export function Sidebar ({ children }) {
    return (
        <div className="flex flex-col absolute top-0 right-0 bottom-0 overflow-x-scroll left-0 md:left-auto w-full lg:w-3/5 min-h-full bg-surface-high text-on-surface p-6 gap-4">
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


