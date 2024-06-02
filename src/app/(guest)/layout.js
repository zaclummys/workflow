export default function Layout ({ children }) {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-6">
            {children}
        </div>
    );
}