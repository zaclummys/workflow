'use client';

import {
    useId, 
} from 'react';
import {
    useRouter, 
} from 'next/navigation';
import {
    Form, Field, Label, Input, 
} from '~/components/form';
import {
    PrimaryButton, 
} from "~/components/button";
import signInAction from '~/actions/sign-in-action';
import useForm from '~/hooks/use-form';

export default function SignInForm () {    
    const router = useRouter();

    const emailId = useId();

    const passwordId = useId();

    const { pending, error, onSubmit } = useForm(async (event) => {
        return signInAction({
            email: event.target.email.value,
            password: event.target.password.value,
        });
    }, () => {
        router.replace('/');
    });

    return (        
        <Form
            onSubmit={onSubmit}>
            <Field>
                <Label htmlFor={emailId}>
                    Email
                </Label>

                <Input
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
                    id={passwordId}
                    type="password"
                    name="password"
                    minLength="8"
                    maxLength="255"
                    disabled={pending}
                    required />
            </Field>

            <PrimaryButton disabled={pending}>
                Sign In
            </PrimaryButton>

            {error && (
                <span className="text-danger">{error}</span>
            )}
        </Form>
    );
}
