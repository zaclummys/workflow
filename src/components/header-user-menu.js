import signOutAction from '~/actions/sign-out-action';
import {
    Menu, MenuItem, 
} from './menu';

export default function HeaderUserMenu ({ onMenuClick }) {
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

