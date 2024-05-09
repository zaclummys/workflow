export function Section ({ children }) {
    return (
        <div className="flex flex-col gap-4">
            {children}
        </div>
    );
}


export function SectionTitle ({ children }) {
    return (
        <span className="text-on-background font-normal text-xl">
            {children}
        </span>
    );
}
