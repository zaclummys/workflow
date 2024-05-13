import { useState } from 'react';

export default function useForm (handler, onSuccess) {
    const [pending, setPending] = useState(false);
    const [error, setErrorMessage] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        
        setErrorMessage(null);
        setPending(true);

        try {
            const { success, message, ...rest } = await handler(event);

            if (success) {
                onSuccess(rest);
            } else {
                setErrorMessage(message);
                setPending(false);
            }
        } catch (error) {
            console.error(error);

            setErrorMessage('An unexpected error ocurred.');
            setPending(false);
        }
    }

    return {
        pending,
        error,
        onSubmit,
    };
}
