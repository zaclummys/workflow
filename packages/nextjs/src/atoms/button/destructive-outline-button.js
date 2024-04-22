export default function DestructiveButton ({ children }) {
    return (
        <button className="button border border-danger text-danger layer">
            {children}
        </button>
    );
}
