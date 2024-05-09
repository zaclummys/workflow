export default function Box ({ children }) {
    return (
        <div className="flex flex-col gap-6 px-8 py-8 bg-surface text-on-surface rounded-md max-w-lg w-full mx-auto">
            {children}
        </div>
    );
}
