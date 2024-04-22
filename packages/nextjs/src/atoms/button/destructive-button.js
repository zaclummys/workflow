export default function DestructiveButton ({ children }) {
    return (
        <button className="button bg-danger text-on-danger hover:bg-[var(--danger-hover-layer)] active:bg-[var(--danger-press-layer)]">
            {children}
        </button>
    );
}
