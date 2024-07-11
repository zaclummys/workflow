import {
    SignBox,
    SignBoxHeader,
    SignBoxHeaderTitle,
    SignBoxHeaderSubtitle,
    SignBoxFooter,
    SignBoxFooterText,
    SignBoxFooterLink, 
} from "~/components/sign-box";

import SignInForm from './sign-in-form';

export const title = 'Sign In';

export default function SignIn () {
    return (
        <SignBox>
            <SignBoxHeader>
                <SignBoxHeaderTitle>Sign In</SignBoxHeaderTitle>
                <SignBoxHeaderSubtitle>Welcome back!</SignBoxHeaderSubtitle>
            </SignBoxHeader>

            <SignInForm />

            <SignBoxFooter>
                <SignBoxFooterText>
                    Don't you have an account?
                </SignBoxFooterText>

                <SignBoxFooterLink href="/sign-up">
                    Sign Up
                </SignBoxFooterLink>
            </SignBoxFooter>
        </SignBox>
    );
}

