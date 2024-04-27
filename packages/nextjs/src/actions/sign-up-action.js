'use server';

import signUp from '@workflow/core/sign-up';
import { redirect } from 'next/navigation';

export default async function signUpAction (form) {
    const { success } = await signUp({
        name: form.get('name'),
        email: form.get('email'),
        password: form.get('password'),
    });

    if (success) {
        redirect('/sign-in');
    }
}
