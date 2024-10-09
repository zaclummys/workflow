export function Section ({ children }) {
    return (
        <div className="flex flex-col gap-4">
            {children}
        </div>
    );
}

export function SectionHeader ({ children }) {
    return (
        <div className="flex flex-row justify-between">
            {children}
        </div>
    );
}

export function SectionTitle ({ children }) {
    return (
        <span className="inline-flex flex-row items-center gap-6 font-normal text-xl">
            {children}
        </span>
    );
}

export function SectionActions ({ children }) {
    return (
        <div className="flex flex-row gap-2">
            {children}
        </div>
    );
}
