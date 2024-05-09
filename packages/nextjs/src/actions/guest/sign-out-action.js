'use server';

import { redirect } from 'next/navigation';

import signOut from '@workflow/core/sign-out';
import { getSessionToken } from '~/actions/cookies';

export default async function signOutAction () {
    const sessionToken = getSessionToken();

    if (sessionToken) {
        await signOut({
            sessionToken
        });        
    }    

    redirect('/sign-in');
}
