'use server';

import signUp from '@workflow/core/sign-up';

export default async function signUpAction ({
    name,
    email,
    password,
}) {
    return signUp({
        name,
        email,
        password,
    });
}
