import Link from 'next/link';

import Logo from '~/components/logo';
import getCurrentUserAction from '~/actions/get-current-user-action';

import HeaderUserMenuButton from './header-user-menu-button';

export default async function Header() {
    const { currentUser } = await getCurrentUserAction();

    if (!currentUser) {
        return null;
    }

    return (
        <header className="bg-surface text-on-surface">
            <div className="flex flex-row px-8 py-2 container mx-auto">
                <div className="flex flex-row flex-grow">
                    <HomeButtonLink />
                </div>

                <HeaderUserMenuButton
                    user={currentUser} />
            </div>
        </header>
    );
}

function HomeButtonLink () {
    return (
        <Link href="/" className="flex flex-row gap-2 items-center">
            <Logo />

            <span className="text-base font-medium">
                Easy Flow
            </span>
        </Link>
    );
}