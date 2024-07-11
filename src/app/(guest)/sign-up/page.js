'use client';

import {
    useId,
    useState, 
} from 'react';

import {
    Form, Field, Label, Input, 
} from '~/components/form';

import {
    PrimaryButton, 
} from "~/components/button";

import {
    SignBox,
    SignBoxHeader,
    SignBoxHeaderTitle,
    SignBoxHeaderSubtitle,
    SignBoxFooter,
    SignBoxFooterText,
    SignBoxFooterLink, 
} from "~/components/sign-box";

import signUpAction from "~/actions/sign-up-action";

import useNavigation from '~/hooks/use-navigation';

export const title = 'Sign Up';

export default function SignUp() {
    const { replaceBySignIn } = useNavigation();

    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();

    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();

        setPending(true);
        setError(null);

        try {
            const { success, message } = await signUpAction({
                name: event.target.name.value,
                email: event.target.email.value,
                password: event.target.password.value,
            });

            if (success) {
                replaceBySignIn();
            } else {
                setError(message);
            }
        } catch {
            setError('An error occurred while signing up. Please try again later.');
        }
    }

    return (
        <SignBox>
            <SignBoxHeader>
                <SignBoxHeaderTitle>Sign Up</SignBoxHeaderTitle>
                <SignBoxHeaderSubtitle>Join us today!</SignBoxHeaderSubtitle>
            </SignBoxHeader>

            <Form onSubmit={onSubmit}>
                <Field>
                    <Label htmlFor={nameId}>
                        Name
                    </Label>

                    <Input
                        id={nameId}
                        disabled={pending}
                        type="text"
                        name="name"
                        required />
                </Field>

                <Field>
                    <Label htmlFor={emailId}>
                        Email
                    </Label>

                    <Input
                        id={emailId}
                        disabled={pending}
                        type="email"
                        name="email"
                        required />
                </Field>

                <Field>
                    <Label htmlFor={passwordId}>
                        Password
                    </Label>

                    <Input
                        id={passwordId}
                        disabled={pending}
                        type="password"
                        name="password"
                        minLength="8"
                        maxLength="255"
                        required />
                </Field>

                <PrimaryButton
                    disabled={pending}>
                    Sign Up
                </PrimaryButton>

                {error && (
                    <Error>
                        {error}
                    </Error>
                )}
            </Form>

            <SignBoxFooter>
                <SignBoxFooterText>
                    Already have an account?
                </SignBoxFooterText>

                <SignBoxFooterLink href="/sign-in">
                    Sign In
                </SignBoxFooterLink>
            </SignBoxFooter>
        </SignBox>
    );
}
