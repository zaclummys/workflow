export default function Menu ({ children }) {
    return (
        <div className="flex flex-col max-w-60 overflow-hidden bg-[var(--menu-background)] rounded-[var(--menu-border-radius)]">
            {children}
        </div>
    );
}
