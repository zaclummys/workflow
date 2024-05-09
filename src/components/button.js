export function PrimaryButton (props) {
    return <button className="button bg-primary text-on-primary hover:bg-[var(--primary-hover-layer)] active:bg-[var(--primary-press-layer)] " { ...props } />;
}

export function DestructiveButton (props) {
    return <button className="button bg-danger text-on-danger hover:bg-[var(--danger-hover-layer)] active:bg-[var(--danger-press-layer)]" {...props} />;
}

export function DestructiveOutlineButon (props) {
    return <button className="button border border-danger text-danger hover:bg-[var(--surface-hover-layer)] active:bg-[var(--surface-press-layer)]" {...props} />
}

export function OutlineButton (props) {
    return <button className="button border border-outline text-on-surface hover:bg-[var(--surface-hover-layer)] active:bg-[var(--surface-press-layer)]" {...props} />;
}
