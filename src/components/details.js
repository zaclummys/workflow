export function Details ({ children }) {
    return (
        <div className="flex flex-col gap-3">
            {children}
        </div>
    );
}

export function DetailCell ({ children }) {
    return (
        <div className="flex flex-col items-start flex-grow gap-1 text-sm">
            {children}
        </div>
    );
}

export function DetailRow ({ children }) {
    return (
        <div className="flex flex-row gap-4">
            {children}
        </div>
    );
}

export function DetailCellHeader ({ children }) {
    return (
        <span className="font-medium">
            {children}
        </span>
    );
}

export function DetailCellText ({ children }) {
    return (
        <span className="font-normal">
            {children}
        </span>
    );
}
