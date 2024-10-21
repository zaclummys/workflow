'use server';

import {
    redirect, 
} from 'next/navigation';
import signOut from '~/core/application/sign-out';
import {
    getSessionToken, 
} from '~/cookies';

export default async function signOutAction () {
    const sessionToken = await getSessionToken();

    if (sessionToken) {
        await signOut({
            sessionToken,
        });        
    }    

    redirect('/sign-in');
}
