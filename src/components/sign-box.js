import Link from 'next/link';

export function SignBox ({ children }) {
    return (
        <div className="flex flex-col gap-6 px-8 py-8 bg-surface text-on-surface rounded-md max-w-md w-full mx-auto">
            {children}
        </div>
    );
}

export function SignBoxHeader ({ children }) {
    return (
        <div className="flex flex-col items-center gap-1">
            {children}
        </div>
    )
}

export function SignBoxHeaderTitle ({ children }) {
    return (
        <span className="font-normal text-2xl">
            {children}
        </span>
    );
}

export function SignBoxHeaderSubtitle ({ children }) {
    return (
        <span className="font-normal text-sm text-on-surface-variant">
            {children}
        </span>
    );
}

export function SignBoxFooter ({ children }) {
    return (
        <div className="flex flex-col gap-2 items-center text-sm">
            {children}
        </div>
    );
}

export function SignBoxFooterText ({ children }) {
    return (
        <span className="text-on-surface-variant">
            {children}
        </span>
    );
}

export function SignBoxFooterLink ({ href, children }) {
    return (
        <Link href={href} className="text-primary">
            {children}
        </Link>
    );
}
