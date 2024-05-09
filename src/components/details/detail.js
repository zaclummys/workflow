export default function Detail ({ children }) {
    return (
        <div className="flex flex-col items-start flex-grow gap-1 text-on-background">
            {children}
        </div>
    );
}
