export default function PrimaryButton ({ children }) {
    return (
        <button className="button bg-primary text-on-primary layer">
            {children}
        </button>
    );
}
