import { useState } from 'react';

export default function useForm (handler, onSuccess) {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();

        setError(null);
        setPending(true);

        try {
            const { success, message } = await handler(event);

            if (success) {
                onSuccess();
            } else {
                setError(message);
            }
        } finally {
            setPending(false);
        }
    }

    return {
        pending,
        error,
        onSubmit,
    };
}
