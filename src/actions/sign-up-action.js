'use server';

import signUp from '~/core/application/sign-up';

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
