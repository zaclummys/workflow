import {
    Box,
    BoxHeader,
    BoxHeaderTitle,
    BoxHeaderSubtitle,
    BoxFooter,
    BoxFooterText,
    BoxFooterLink,
} from "~/components/box/box";

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

