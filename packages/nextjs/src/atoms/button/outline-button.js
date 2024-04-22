export default function OutlineButton ({ children }) {
    return (
        <button className="button border border-outline text-on-surface hover:bg-[var(--surface-hover-layer)] active:bg-[var(--surface-press-layer)]">
            {children}
        </button>
    );
}
