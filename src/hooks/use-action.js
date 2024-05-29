import {
    useState, 
} from 'react';

const defaultError = 'An unexpected error ocurred.';

export default function useAction (handler, onSuccess) {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const execute = async (...args) => {
        setError(null);
        setPending(true);

        try {
            const { success, error, ...rest } = await handler(...args);

            if (success) {
                onSuccess(rest);
            } else {
                setError(error || defaultError);
                setPending(false);
            }
        } catch (error) {
            console.error(error);

            setError(defaultError);
            setPending(false);
        }
    }

    return {
        pending,
        error,
    };
}
