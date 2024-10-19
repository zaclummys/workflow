import { twMerge } from "tailwind-merge";

export function Button ({
    type = 'button',
    className,
    ...props
}) {
    const buttonClassName = twMerge(
        'flex items-center justify-center text-sm font-medium h-10 px-4 py-0 rounded-md disabled:opacity-70 disabled:pointer-events-none transition-colors',
        className,
    );

    return (
        <button
            type={type}
            className={buttonClassName}
            {...props} 
        />
    );
}

export function PrimaryButton (props) {
    return <Button className="bg-primary text-on-primary hover:bg-[var(--primary-hover)] active:bg-[var(--primary-press)]" { ...props } />;
}

export function DestructiveButton (props) {
    return <Button className="bg-danger text-on-danger hover:bg-[var(--danger-hover)] active:bg-[var(--danger-press)]" {...props} />;
}

export function OutlineButton ({ className, ...props }) {
    const buttonClassName = twMerge(
        'border border-outline text-on-surface hover:bg-[var(--surface-hover)] active:bg-[var(--surface-press)]',
        className,
    );

    return (
        <Button
            className={buttonClassName}
            {...props}
        />
    );
}
