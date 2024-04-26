export default function DefaultMenuItem ({ children }) {
    return (
        <button className="menu-item text-on-surface hover:bg-[var(--surface-hover-layer)] active:bg-[var(--surface-press-layer)]">
            {children}
        </button>
    );
}
