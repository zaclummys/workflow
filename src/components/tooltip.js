export default function Tooltip ({
    text,
    children,
}) {
    return (
        <div className="relative">
            <div className="peer">
                {children}
            </div>

            <div
                className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-max bg-surface-high rounded px-2 py-1 transition-opacity duration-150 opacity-0 peer-hover:opacity-100">
                <span className="font-normal text-sm text-white">
                    {text}
                </span>
            </div>
        </div>
    );
}