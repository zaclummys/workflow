import Link from 'next/link';

import HeaderUserMenuButton from '~/components/header-user-menu-button';

import getCurrentUserAction from '~/actions/get-current-user-action';

export default async function Header () {
    const { currentUser } = await getCurrentUserAction();

    if (!currentUser) {
        return null;
    }

    return (
        <header className="flex flex-row bg-surface text-on-surface px-6 py-2 h-20">
            <div className="flex flex-row flex-grow">
                <Link href="/" className="flex flex-row gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-8 h-8 text-on-surface fill-on-surface">
                        <path d="M 3.5 1 C 2.1252104 1 1 2.1252104 1 3.5 C 1 4.7029409 1.8636261 5.7150505 3 5.9492188 L 3 9 L 1.5 9 A 0.50005 0.50005 0 0 0 1 9.5 L 1 13.5 A 0.50005 0.50005 0 0 0 1.5 14 L 5.5 14 A 0.50005 0.50005 0 0 0 6 13.5 L 6 9.5 A 0.50005 0.50005 0 0 0 5.5 9 L 4 9 L 4 5.9492188 C 4 5.9492188 4.0019531 5.9492188 4.0019531 5.9492188 C 4.9766132 5.7483743 5.7491084 4.9749194 5.9492188 4 L 9.2929688 4 L 11 5.7070312 L 11 9.0507812 C 9.8626981 9.2842218 9 10.296397 9 11.5 C 9 12.87479 10.12521 14 11.5 14 C 12.87479 14 14 12.87479 14 11.5 C 14 10.296397 13.137302 9.2842218 12 9.0507812 L 12 5.7070312 L 13.853516 3.8535156 A 0.50005 0.50005 0 0 0 13.853516 3.1464844 L 11.853516 1.1464844 A 0.50005 0.50005 0 0 0 11.492188 1 A 0.50005 0.50005 0 0 0 11.146484 1.1464844 L 9.2929688 3 L 5.9492188 3 C 5.7157781 1.8626983 4.7036028 1 3.5 1 z M 3.5 2 C 4.3343494 2 5 2.6656506 5 3.5 C 5 4.3343494 4.3343494 5 3.5 5 C 2.6656506 5 2 4.3343494 2 3.5 C 2 2.6656506 2.6656506 2 3.5 2 z M 11.5 2.2070312 L 12.792969 3.5 L 11.5 4.7929688 L 10.207031 3.5 L 11.5 2.2070312 z M 2 10 L 5 10 L 5 13 L 2 13 L 2 10 z M 11.5 10 C 12.334349 10 13 10.665651 13 11.5 C 13 12.334349 12.334349 13 11.5 13 C 10.665651 13 10 12.334349 10 11.5 C 10 10.665651 10.665651 10 11.5 10 z" />
                    </svg>

                    <span className="text-base font-medium">
                        Workflow
                    </span>
                </Link>
            </div>

            <HeaderUserMenuButton
                user={currentUser} />
        </header>
    );
}


