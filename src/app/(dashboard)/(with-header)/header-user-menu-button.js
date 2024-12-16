'use client';

import {
    useState, 
} from 'react';

import {
    Menu,
    MenuItem, 
} from '~/components/menu';

import UserColor from '~/components/user-color';

import signOutAction from '~/actions/sign-out-action';

export default function HeaderUserMenuButton ({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    const onButtonClick = () => {
        setIsOpen(true);
    };

    const onBackdropClick = () => {
        setIsOpen(false);
    };

    const onMenuClick = () => {
        setIsOpen(false);
    };

    if (!user) {
        return null;
    }

    return (
        <div className="relative">
            <HeaderUserButton
                user={user}
                onClick={onButtonClick} />

            {isOpen && (
                <div>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={onBackdropClick} />
                    
                    <div className="absolute right-0 top-0 z-10">
                        <HeaderUserMenu
                            onMenuClick={onMenuClick} />
                    </div>
                </div>
            )}
        </div>
    );
}

function HeaderUserButton ({
    user,
    onClick,
}) {
    if (!user) {
        return null;
    }

    return (
        <button
            className="flex flex-row items-center gap-2 px-3 py-3 rounded hover:bg-[var(--surface-hover)] active:bg-[var(--surface-press)] transition-colors"
            onClick={onClick}>
            <UserColor
                className="w-8 h-8"
                user={user} />

            <span className="text-base font-normal">
                {user.name}
            </span>
        </button>
    );
}

function HeaderUserMenu ({ onMenuClick }) {
    const onSignOutButtonClick = async () => {
        await signOutAction();
    };

    return (
        <Menu
            onClick={onMenuClick}>
            <MenuItem>
                Edit personal information
            </MenuItem>

            <MenuItem>
                Change password
            </MenuItem>

            <MenuItem
                className="text-danger"
                onClick={onSignOutButtonClick}>
                Sign Out
            </MenuItem>
        </Menu>
    );
}

