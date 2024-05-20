export function Modal ({ children }) {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />

            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="flex flex-col gap-4 px-4 py-4 bg-surface text-on-surface rounded w-full max-w-3xl">
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

export function ModalText ({ children }) {
    return (
        <span>
            { children }
        </span>
    );
}

export function ModalFooter ({ children }) {
    return (
        <div className="flex flex-row justify-between">
            { children }
        </div>
    );
}
