import { useState } from 'react';

const defaultErrorMessage = 'An unexpected error ocurred.';

export default function useForm (handler, onSuccess) {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        
        setError(null);
        setPending(true);

        try {
            const { success, message, ...rest } = await handler(event);

            if (success) {
                onSuccess(rest);
            } else {
                if (message) {
                    setError(message);
                } else {
                    setError(defaultErrorMessage);
                }

                setPending(false);
            }
        } catch (error) {
            console.error(error);

            setError('An unexpected error ocurred.');
            setPending(false);
        }
    }

    return {
        pending,
        error,
        onSubmit,
    };
}
