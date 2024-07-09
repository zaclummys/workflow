import { twMerge } from "tailwind-merge";

export function Button ({ className, ...props }) {
    const buttonClassName = twMerge(
        'flex items-center justify-center text-sm font-medium h-10 px-4 py-0 rounded-md disabled:opacity-70 disabled:pointer-events-none transition-colors',
        className,
    );

    return <button className={buttonClassName} {...props} />;
}

export function PrimaryButton (props) {
    return <Button className="bg-primary text-on-primary hover:bg-[var(--primary-hover-layer)] active:bg-[var(--primary-press-layer)]" { ...props } />;
}

export function DestructiveButton (props) {
    return <Button className="bg-danger text-on-danger hover:bg-[var(--danger-hover-layer)] active:bg-[var(--danger-press-layer)]" {...props} />;
}

export function OutlineButton (props) {
    return <Button className="border border-outline text-on-surface hover:bg-[var(--surface-hover-layer)] active:bg-[var(--surface-press-layer)]" {...props} />;
}
