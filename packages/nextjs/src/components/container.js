export default function Container ({ children }) {
    return (
        <div className="flex flex-col px-8 py-8 gap-4 container mx-auto">
            {children}
        </div>
    );
}
