export default function DestructiveMenuItem ({ children }) {
    return (
        <button className="menu-item text-danger hover:bg-[var(--surface-hover-layer)] active:bg-[var(--surface-press-layer)]">
            {children}
        </button>
    );
}
