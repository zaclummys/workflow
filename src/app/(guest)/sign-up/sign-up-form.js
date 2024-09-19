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
} from '~/components/button';

import signUpAction from '~/actions/sign-up-action';

export default function SignUpForm() {
    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();

    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    
    const { replaceBySignIn } = useNavigation();

    const onSubmit = async (event) => {
        event.preventDefault();

        setPending(true);
        setError(null);

        try {
            const {success, message} = await signUpAction({
                name: event.target.name.value,
                email: event.target.email.value,
                password: event.target.password.value,
            });

            if (success) {
                replaceBySignIn();
            } else {
                setPending(false);
                setError(message);
            }
        } catch {
            setPending(false);
            setError('An error occurred while signing up. Please try again later.');
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <Field>
                <Label htmlFor={nameId}>
                    Name
                </Label>

                <Input
                    required
                    id={nameId}
                    disabled={pending}
                    type="text"
                    name="name"
                    data-testid="sign-up-name-field"
                />
            </Field>

            <Field>
                <Label htmlFor={emailId}>
                    Email
                </Label>

                <Input
                    required
                    id={emailId}
                    disabled={pending}
                    type="email"
                    name="email"
                    data-testid="sign-up-email-field"
                />
            </Field>

            <Field>
                <Label htmlFor={passwordId}>
                    Password
                </Label>

                <Input
                    required
                    id={passwordId}
                    disabled={pending}
                    type="password"
                    name="password"
                    minLength="8"
                    maxLength="255"
                    data-testid="sign-up-password-field"
                />
            </Field>

            <PrimaryButton
                disabled={pending}>
                Sign Up
            </PrimaryButton>

            {error && (
                <span className="text-danger text-center">{error}</span>
            )}
        </Form>
    );
}