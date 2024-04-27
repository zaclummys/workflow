import { useId } from "react";

import Form from "~/components/form";
import Field from "~/components/field";
import Input from "~/components/input";
import Label from "~/components/label";
import PrimaryButton from "~/components/button/primary-button";

import Box from "~/components/box/box";

import BoxHeader from "~/components/box/box-header";
import BoxHeaderTitle from "~/components/box/box-header-title";
import BoxHeaderSubtitle from "~/components/box/box-header-subtitle";

import BoxFooter from "~/components/box/box-footer";
import BoxFooterText from "~/components/box/box-footer-text";
import BoxFooterLink from "~/components/box/box-footer-link";

import signUpAction from "~/actions/sign-up-action";

export const title = 'Sign Up';

export default function SignUp() {
    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();

    return (
        <Box>
            <BoxHeader>
                <BoxHeaderTitle>Sign Up</BoxHeaderTitle>
                <BoxHeaderSubtitle>Join us today!</BoxHeaderSubtitle>
            </BoxHeader>

            <Form action={signUpAction}>
                <Field>
                    <Label htmlFor={nameId}>
                        Name
                    </Label>

                    <Input
                        id={nameId}
                        type="text"
                        required />
                </Field>

                <Field>
                    <Label htmlFor={emailId}>
                        Email
                    </Label>

                    <Input
                        id={emailId}
                        type="email"
                        required />
                </Field>

                <Field>
                    <Label htmlFor={passwordId}>
                        Password
                    </Label>

                    <Input
                        id={passwordId}
                        type="password"
                        required />
                </Field>

                <PrimaryButton>
                    Sign Up
                </PrimaryButton>
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
