import {
    SignBox,
    SignBoxHeader,
    SignBoxHeaderTitle,
    SignBoxHeaderSubtitle,
    SignBoxFooter,
    SignBoxFooterText,
    SignBoxFooterLink, 
} from "~/components/sign-box";

import SignUpForm from './sign-up-form';

export const title = 'Sign Up';

export default function SignUp() {
    return (
        <SignBox>
            <SignBoxHeader>
                <SignBoxHeaderTitle>Sign Up</SignBoxHeaderTitle>
                <SignBoxHeaderSubtitle>Join us today!</SignBoxHeaderSubtitle>
            </SignBoxHeader>

            <SignUpForm />

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
