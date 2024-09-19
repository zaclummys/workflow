import {
    twMerge, 
} from 'tailwind-merge';

export function Menu ({ className, ...props }) {
    return (
        <menu
            className={twMerge('flex flex-col rounded bg-surface-high text-on-surface overflow-hidden text-nowrap max-w-60', className)}
            {...props}
        />
    );
}

export function MenuItem ({ className, ...props }) {
    return (
        <button
            className={twMerge('flex flex-row items-center gap-3 py-3 px-5 text-left text-sm hover:bg-[var(--surface-high-hover-layer)] active:bg-[var(--surface-high-press-layer)] transition-colors', className)}
            {...props}
        />
    );
}
