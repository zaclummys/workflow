export default function Placeholder ({
    title,
    description,
}) {
    return (
        <div className="flex flex-col text-on-background text-center gap-1 py-10">
            <span className="font-medium text-lg">{title}</span>
            <span className="font-normal text-base">{description}</span>
        </div>
    );
}
