import Link from 'next/link';

import { twMerge } from 'tailwind-merge';

export function Card ({ children }) {
    return (
        <div
            className="relative flex flex-col gap-2 overflow-hidden bg-surface text-on-surface rounded-md p-4  hover:bg-[var(--surface-hover-layer)] transition-colors">
            {children}
        </div>
    );
}

export function CardTitle ({ className, children }) {
    return (
        <span className={twMerge('text-base font-medium', className)}>
            {children}
        </span>
    );
}

export function CardText ({ children }) {
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

export function CardLink (props) {
    return (
        <Link
            {...props}
            className="absolute inset-0"
        />
    );
}
