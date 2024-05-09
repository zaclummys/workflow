import { twMerge } from 'tailwind-merge';

export function Menu (props) {
    return <menu className="flex flex-col rounded bg-surface-high overflow-hidden text-nowrap max-w-60" {...props} />
}

export function MenuItem ({ className, ...props }) {
    return <button
        className={twMerge('py-3 px-6 text-left text-sm hover:bg-[var(--surface-high-hover-layer)] active:bg-[var(--surface-high-press-layer)] transition-colors', className)}
        {...props}
    />;
}
