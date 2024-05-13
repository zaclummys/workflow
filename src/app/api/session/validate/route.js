import { NextResponse } from 'next/server'

import validateSession from '~/core/application/validate-session';

export async function POST (request) {
    const { sessionToken } = await request.json();

    try {
        const { isSessionValid } = await validateSession({
            sessionToken: sessionToken,
        });

        return NextResponse.json({
            isSessionValid,
        });
    } catch (error) {
        console.error(error);
        
        return NextResponse.status(500);
    }
}
