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

export const title = 'Sign In';

export default function SignIn() {
    const emailId = useId();
    const passwordId = useId();

    return (
        <Box>
            <BoxHeader>
                <BoxHeaderTitle>Sign In</BoxHeaderTitle>
                <BoxHeaderSubtitle>Welcome back!</BoxHeaderSubtitle>
            </BoxHeader>

            <Form>
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
                    Sign In
                </PrimaryButton>
            </Form>

            <BoxFooter>
                <BoxFooterText>
                    Don't you have an account?
                </BoxFooterText>

                <BoxFooterLink href="/sign-up">
                    Sign Up
                </BoxFooterLink>
            </BoxFooter>
        </Box>
    );
}
