'use client';

import {
    useState, 
} from 'react';
import HeaderUserButton from './header-user-button';
import HeaderUserMenu from './header-user-menu';

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
                    
                    <div className="absolute right-0 top-0">
                        <HeaderUserMenu
                            onMenuClick={onMenuClick} />
                    </div>
                </div>
            )}
        </div>
    );
}
