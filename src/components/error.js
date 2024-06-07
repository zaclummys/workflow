export default function Error ({ children }) {
    return (
        <span className="text-sm text-danger">
            {children}
        </span>
    );
}