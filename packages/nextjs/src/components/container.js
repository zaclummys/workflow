export default function Container ({ children }) {
    return (
        <div className="flex flex-col gap-4 container mx-auto">
            {children}
        </div>
    );
}
