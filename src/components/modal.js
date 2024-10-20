import { twMerge } from "tailwind-merge";

export function Modal ({ children }) {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />

            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="flex flex-col gap-4 p-4 bg-surface text-on-surface rounded-md w-full max-w-3xl">
                    { children }
                </div>
            </div>
        </>
    );
}

export function ModalTitle ({ children }) {
    return (
        <span className="font-normal text-xl">
            { children }
        </span>
    );
}

export function ModalSubtitle ({ children }) {
    return (
        <span className="font-normal text-lg">
            { children }
        </span>
    );
}

export function ModalFooter ({ className, children }) {
    return (
        <div className={twMerge("flex flex-row justify-between", className)}>
            { children }
        </div>
    );
}
