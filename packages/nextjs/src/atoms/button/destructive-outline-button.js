export default function DestructiveButton ({ children }) {
    return (
        <button className="button border border-danger text-danger hover:bg-[var(--surface-hover-layer)] active:bg-[var(--surface-press-layer)]">
            {children}
        </button>
    );
}
