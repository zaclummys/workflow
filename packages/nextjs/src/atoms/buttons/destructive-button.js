export default function DestructiveButton ({ children }) {
    return (
        <button className="button bg-danger text-on-danger hover:bg-danger/[0.92] active:bg-danger/[0.88]">
            {children}
        </button>
    );
}
