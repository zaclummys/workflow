export default function DestructiveMenuItem ({ children }) {
    return (
        <button className="menu-item text-danger layer">
            {children}
        </button>
    );
}
