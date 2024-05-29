export function Form(props) {
    return <form className="flex flex-col gap-4" {...props} />
}

export function Field({ children }) {
    return (
        <div className="flex flex-col gap-2">
            {children}
        </div>
    );
}

export function Input(props) {
    return <input className="px-3 py-2 font-normal text-base text-on-surface border border-outline bg-transparent rounded transition-all outline-none focus:ring focus:ring-primary focus:ring-2 disabled:opacity-[0.38]" {...props} />
}

export function Label(props) {
    return <label className="font-medium text-sm text-on-surface-variant" {...props} />;
}

export function Select(props) {
    return <select className="px-3 py-2 font-normal text-base text-on-surface border border-outline bg-transparent rounded transition-colors outline-none focus:ring focus:ring-primary focus:ring-2 disabled:opacity-[0.38]" {...props} />;
}

export function Option(props) {
    return <option className="text-on-surface bg-surface" {...props} />;
}

export function TextArea(props) {
    return <textarea className="px-3 py-2 font-normal text-base text-on-surface border border-outline bg-transparent rounded transition-colors outline-none focus:ring focus:ring-primary focus:ring-2 disabled:opacity-[0.38] resize-none" {...props} />;
}

export function Checkbox(props) {
    return <input type="checkbox" className="w-4 h-4 border-none rounded accent-primary" {...props} />;
}

