export default function Grid ({ children }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {children}
        </div>
    );
}