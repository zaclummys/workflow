export default function PrimaryButton ({ children }) {
    return (
        <button className="button bg-primary text-on-primary hover:bg-[var(--primary-hover-layer)] active:bg-[var(--primary-press-layer)]">
            {children}
        </button>
    );
}
