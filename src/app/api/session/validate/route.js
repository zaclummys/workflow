import { NextResponse } from 'next/server'

import { getSessionToken } from '~/cookies';

import validateSession from '~/core/application/validate-session';

export async function POST (request) {
    const sessionToken = getSessionToken();

    const validateSessionOutput = await validateSession({
        sessionToken,
    });

    return NextResponse.json(validateSessionOutput);
}
