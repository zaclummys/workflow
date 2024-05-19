export function Placeholder ({ children }) {
    return (
        <div className="flex flex-col text-center gap-1 py-10">
            {children}
        </div>
    );
}

export function PlaceholderTitle ({ children }) {
    return (
        <span className="font-medium text-lg">
            {children}
        </span>
    );
}

export function PlaceholderText ({ children }) {
    return (
        <span className="font-normal text-base">
            {children}
        </span>
    );
}
