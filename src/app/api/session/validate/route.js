import { NextResponse } from 'next/server'

import { getSessionToken } from '~/cookies';

import validateSession from '~/core/application/validate-session';

export async function POST () {
    const sessionToken = await getSessionToken();

    const validateSessionOutput = await validateSession({
        sessionToken,
    });

    return NextResponse.json(validateSessionOutput);
}
