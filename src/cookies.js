import {
    cookies, 
} from 'next/headers';

export const sessionTokenCookieName = 'session_token';

export async function getSessionToken () {
    const currentCookies = await cookies();

    const sessionTokenCookie = currentCookies.get(sessionTokenCookieName);
    
    if (!sessionTokenCookie || !sessionTokenCookie.value) {
        return null;
    }

    return sessionTokenCookie.value;
}

export async function setSessionToken (sessionToken) {
    await cookies().set(sessionTokenCookieName, sessionToken, {
        path: '/',
        httpOnly: true,
    });
}
