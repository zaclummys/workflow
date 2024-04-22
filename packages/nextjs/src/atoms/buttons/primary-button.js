export default function PrimaryButton ({ children }) {
    return (
        <button className="button bg-primary text-on-primary hover:bg-primary/[0.92] active:bg-primary/[0.88]">
            {children}
        </button>
    );
}
