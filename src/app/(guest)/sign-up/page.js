'use client';

import { useId } from 'react';
import { useRouter } from 'next/navigation';


import { Form, Field, Label, Input } from '~/components/form';
import { PrimaryButton } from "~/components/button";

import {
    Box,
    BoxHeader,
    BoxHeaderTitle,
    BoxHeaderSubtitle,
    BoxFooter,
    BoxFooterText,
    BoxFooterLink,
} from "~/components/box/box";

import signUpAction from "~/actions/guest/sign-up-action";
import useForm from '~/hooks/use-form';

export const title = 'Sign Up';

export default function SignUp() {
    const router = useRouter();

    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();

    const {
        pending,
        error,

        onSubmit,
    } = useForm(async (event) => {
        return signUpAction({
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
        });
    }, () => {
        router.replace('/sign-in');
    });

    return (
        <Box>
            <BoxHeader>
                <BoxHeaderTitle>Sign Up</BoxHeaderTitle>
                <BoxHeaderSubtitle>Join us today!</BoxHeaderSubtitle>
            </BoxHeader>

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
                        minLength="1"
                        maxLength="255"
                        required />
                </Field>

                <PrimaryButton disabled={pending}>
                    Sign Up
                </PrimaryButton>

                {error && (
                    <span className="text-danger">
                        {error}
                    </span>
                )}
            </Form>

            <BoxFooter>
                <BoxFooterText>
                    Already have an account?
                </BoxFooterText>

                <BoxFooterLink href="/sign-in">
                    Sign In
                </BoxFooterLink>
            </BoxFooter>
        </Box>
    );
}
