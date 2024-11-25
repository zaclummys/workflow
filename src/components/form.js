import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function Form({ className, ...props }) {
    return <form className={twMerge("flex flex-col gap-4", className)} {...props} />
}

export function Field({ children }) {
    return (
        <div className="flex flex-col flex-1 gap-2">
            {children}
        </div>
    );
}

export function Row({ children }) {
    return (
        <div className="flex flex-row items-end gap-4">
            {children}
        </div>
    );
}

export function Input(props) {
    return (
        <input
            className="w-full h-10 px-2 font-normal text-base text-on-surface border border-outline bg-transparent rounded-md transition-colors outline-none focus:ring focus:ring-primary focus:ring-2 disabled:opacity-[0.38]"
            {...props}
        />
    );
}

export function Radio (props) {
    return <input type="radio" className="px-3 py-2 font-normal text-base text-on-surface border border-outline bg-transparent rounded transition-all outline-none accent-primary disabled:opacity-[0.38]" {...props} />
}

export function Label ({ disabled, ...props }) {
    const additionalClassNames = clsx({
        'opacity-[0.38]': disabled,
    });

    const finalClassNames = twMerge('font-medium text-sm text-on-surface-variant', additionalClassNames);

    return <label className={finalClassNames} {...props} />;
}

export function InlineLabel ({ disabled, ...props }) {
    const additionalClassNames = clsx({
        'opacity-[0.38]': disabled,
    });

    const finalClassNames = twMerge('font-normal text-base', additionalClassNames);

    return <label className={finalClassNames} {...props} />;
}

export function Select(props) {
    return (
        <select
            className="h-10 appearance-none px-3 py-2 font-normal text-base text-on-surface border border-outline bg-transparent rounded transition-colors outline-none focus:ring focus:ring-primary focus:ring-2 disabled:opacity-[0.38]"
            {...props}
        />
    );
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

