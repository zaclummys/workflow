export default function OutlineButton ({ children }) {
    return (
        <button className="button border border-outline text-on-surface hover:bg-on-surface/[0.08] active:bg-on-surface/[0.12]">
            {children}
        </button>
    );
}
