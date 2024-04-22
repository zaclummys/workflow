export default function DestructiveButton ({ children }) {
    return (
        <button className="button bg-danger text-on-danger layer">
            {children}
        </button>
    );
}
