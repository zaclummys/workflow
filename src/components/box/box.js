import Link from 'next/link';

export function Box({ children }) {
    return (
        <div className="flex flex-col gap-6 px-8 py-8 bg-surface text-on-surface rounded-md max-w-lg w-full mx-auto">
            {children}
        </div>
    );
}

export function BoxHeader({ children }) {
    return (
        <div className="flex flex-col items-center gap-1">
            {children}
        </div>
    )
}

export function BoxHeaderTitle({ children }) {
    return (
        <span className="font-normal text-2xl">
            {children}
        </span>
    );
}

export function BoxHeaderSubtitle({ children }) {
    return (
        <span className="font-normal text-sm text-on-surface-variant">
            {children}
        </span>
    );
}

export function BoxFooter({ children }) {
    return (
        <div className="flex flex-col gap-2 items-center text-sm">
            {children}
        </div>
    );
}

export function BoxFooterText({ children }) {
    return (
        <span className="text-on-surface-variant">
            {children}
        </span>
    );
}

export function BoxFooterLink({ href, children }) {
    return (
        <Link href={href} className="text-primary">
            {children}
        </Link>
    );
}
