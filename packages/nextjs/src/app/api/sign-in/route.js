import signIn from '@workflow/core/sign-in';
import { NextResponse } from 'next/server';

export async function POST (request) {
    try {
        const { email, password } = await request.json();

        const signInOutput = await signIn({
            email,
            password,
        });

        if (signInOutput.success) {
            const response = NextResponse.json({
                success: true
            });

            response.cookies.set('session_token', signInOutput.sessionToken, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            return response;
        } else {
            return NextResponse.json({
                success: false,
                message: signInOutput.message,
            })
        }
    } catch (error) {
        console.error(error);
        
        return NextResponse.status(500);
    }
}
