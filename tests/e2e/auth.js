import { faker } from '@faker-js/faker';

export async function signUp (page) {
    await page.goto('/sign-up');
    
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await page.getByLabel('Name').fill(name);
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);

    await page.keyboard.press('Enter');
    
    await page.waitForURL('/sign-in');

    return {
        name,
        email,
        password,
    };
}

export async function signIn (page) {
    const { email, password } = await signUp(page);

    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);

    await page.keyboard.press('Enter');
    
    await page.waitForURL('/');
}
