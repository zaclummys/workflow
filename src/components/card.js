import Link from 'next/link';

export function Card ({ children }) {
    return (
        <div
            className="relative flex flex-col gap-2 overflow-hidden text-on-surface rounded-lg p-4 bg-[var(--surface-default-layer)] hover:bg-[var(--surface-hover-layer)] transition-colors">
            {children}
        </div>
    );
}

export function CardTitle ({ children }) {
    return (
        <span className="text-base font-medium">
            {children}
        </span>
    );
}

export function CardDescription ({ children }) {
    return (
        <span className="text-base font-normal">
            {children}
        </span>
    );
}

export function CardSection ({ children }) {
    return (
        <div className="flex flex-col gap-1">
            {children}
        </div>
    );
}

export function CardSectionTitle ({ children }) {
    return (
        <span className="text-sm font-normal">
            {children}
        </span>
    );
}

export function CardLink ({ href }) {
    return (
        <Link
            href={href}
            className="absolute inset-0"
        />
    );
}
