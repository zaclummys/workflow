export default function Placeholder ({
    title,
    description,
}) {
    return (
        <div className="gap-1 py-10">
            <span>{title}</span>
            <span>{description}</span>
        </div>
    );
}
