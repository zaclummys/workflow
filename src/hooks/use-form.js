import { useState } from 'react';

export default function useForm (handler, onSuccess) {
    const [pending, setPending] = useState(false);
    const [error, setErrorMessage] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();

        setErrorMessage(null);
        setPending(true);

        try {
            const { success, message } = await handler(event);

            if (success) {
                onSuccess();
            } else {
                setErrorMessage(message);
                setPending(false);
            }
        } catch {
            setPending(false);
        }
    }

    return {
        pending,
        error,
        onSubmit,
    };
}
