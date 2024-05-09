import Box from "~/components/box/box";

import BoxHeader from "~/components/box/box-header";
import BoxHeaderTitle from "~/components/box/box-header-title";
import BoxHeaderSubtitle from "~/components/box/box-header-subtitle";

import BoxFooter from "~/components/box/box-footer";
import BoxFooterText from "~/components/box/box-footer-text";
import BoxFooterLink from "~/components/box/box-footer-link";

import SignInForm from './sign-in-form';

export const title = 'Sign In';

export default function SignIn () {
    return (
        <Box>
            <BoxHeader>
                <BoxHeaderTitle>Sign In</BoxHeaderTitle>
                <BoxHeaderSubtitle>Welcome back!</BoxHeaderSubtitle>
            </BoxHeader>

            <SignInForm />

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

