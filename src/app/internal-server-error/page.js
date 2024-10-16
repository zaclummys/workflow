export default function InternalServerErrorPage () {
    return (
        <div className="fixed inset-o flex flex-col items-center justify-center w-full h-full text-on-background gap-2">
            <span className="text-2xl font-bold">
                500
            </span>
            <span className="text-2xl font-semibold text-on-background-variant">
                Internal Server Error
            </span>
        </div>
    );
}