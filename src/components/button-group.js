export default function ButtonGroup ({ children }) {
    return (
        <div className="flex flex-row items-center gap-2">
            {children}
        </div>
    );
}