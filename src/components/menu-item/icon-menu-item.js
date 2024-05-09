export default function IconMenuItem ({ children }) {
    return (
        <button className="menu-item text-on-surface gap-6 hover:bg-[var(--surface-hover-layer)] active:bg-[var(--surface-press-layer)]">
            {children}
        </button>
    );
}
