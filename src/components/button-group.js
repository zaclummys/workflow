export default function ButtonGroup ({ children }) {
    return (
        <div className="flex flex-row gap-2">
            {children}
        </div>
    );
}