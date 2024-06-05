import { twMerge } from "tailwind-merge";

export function Form({ className, ...props }) {
    return <form className={twMerge("flex flex-col gap-4", className)} {...props} />
}

export function Field({ children }) {
    return (
        <div className="flex flex-col flex-grow gap-2">
            {children}
        </div>
    );
}

export function Input(props) {
    return <input className="h-10 px-2 font-normal text-base text-on-surface border border-outline bg-transparent rounded-md transition-all outline-none focus:ring focus:ring-primary focus:ring-2 disabled:opacity-[0.38]" {...props} />
}

export function Radio (props) {
    return <input type="radio" className="px-3 py-2 font-normal text-base text-on-surface border border-outline bg-transparent rounded transition-all outline-none accent-primary disabled:opacity-[0.38]" {...props} />
}

export function Label (props) {
    return <label className="font-medium text-sm text-on-surface-variant aria-disabled:opacity-[0.38]" {...props} />;
}

export function InlineLabel (props) {
    return <label className="font-normal text-base aria-disabled:opacity-[0.38]" {...props} />;
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
    return <input type="checkbox" className="w-4 h-4 accent-primary" {...props} />;
}

