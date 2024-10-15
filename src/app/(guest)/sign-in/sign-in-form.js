'use client';

import {
    useId, 
    useState,
} from 'react';

import useNavigation from '~/hooks/use-navigation';

import {
    Form,
    Field,
    Label,
    Input, 
} from '~/components/form';

import {
    PrimaryButton, 
} from "~/components/button";

import signInAction from '~/actions/sign-in-action';

export default function SignInForm () {    
    const emailId = useId();
    const passwordId = useId();
    
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    
    const { navigateToHome } = useNavigation();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setPending(true);
        setError(null);

        try {
            const { success, message} = await signInAction({
                email: event.target.email.value,
                password: event.target.password.value,
            });

            if (success) {
                navigateToHome();
            } else {
                setPending(false);
                setError(message);
            }
        } catch {
            setPending(false);
            setError('An error occurred while signing in. Please try again later.');
        }
    }

    return (        
        <Form
            onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor={emailId}>
                    Email
                </Label>

                <Input
                    data-testid="sign-in-email-field"
                    id={emailId}
                    type="email"
                    name="email"
                    disabled={pending}
                    required />
            </Field>

            <Field>
                <Label htmlFor={passwordId}>
                    Password
                </Label>

                <Input
                    data-testid="sign-in-password-field"
                    id={passwordId}
                    type="password"
                    name="password"
                    minLength="8"
                    maxLength="255"
                    disabled={pending}
                    required />
            </Field>

            <PrimaryButton
                data-testid="sign-in-submit-button"
                disabled={pending}>
                Sign In
            </PrimaryButton>

            {error && (
                <span className="text-danger text-center">{error}</span>
            )}
        </Form>
    );
}
