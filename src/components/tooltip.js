import { useState } from 'react';

export default function Tooltip ({
    text,
    children,
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <div
                onPointerEnter={() => setIsOpen(true)}
                onPointerLeave={() => setIsOpen(false)}>
                {children}
            </div>

            <div
                className={`absolute left-1/2 transform -translate-x-1/2 mt-1 w-max bg-surface-high rounded px-2 py-1 transition-opacity duration-150 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                <span className="font-normal text-sm text-white">
                    {text}
                </span>
            </div>
        </div>
    );
}