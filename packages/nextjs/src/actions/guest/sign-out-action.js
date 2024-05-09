'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import signOut from '@workflow/core/sign-out';

export default async function signOutAction () {
    const cookieStore = cookies();

    const sessionTokenCookie = cookieStore.get('session_token');

    if (sessionTokenCookie && sessionTokenCookie.value) {
        await signOut({
            sessionToken: sessionTokenCookie.value
        });        
    }

    cookieStore.delete('session_token');

    redirect('/sign-in');
}
