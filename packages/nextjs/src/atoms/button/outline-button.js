export default function OutlineButton ({ children }) {
    return (
        <button className="button border border-outline text-on-surface layer">
            {children}
        </button>
    );
}
