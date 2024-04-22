import { useId } from 'react';

export default function InputField ({
    label,
    value,
    disabled,
    placeholder,
}) {
    const id = useId();

    return (
        <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-on-surface-variant" for={id}>
                {label}
            </label>

            <input
                className="px-3 py-2 font-normal text-base text-on-surface border border-outline bg-transparent rounded transition-colors focus:outline-none focus:ring focus:ring-primary disabled:opacity-[0.38]"
                id={id}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
            />
        </div>
    );
}
