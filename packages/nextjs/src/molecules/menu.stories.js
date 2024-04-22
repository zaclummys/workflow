import Menu from '~/molecules/menu';

import DefaultMenuItem from '~/atoms/menu-item/default-menu-item';
import DestructiveMenuItem from '~/atoms/menu-item/destructive-menu-item';
import IconMenuItem from '~/atoms/menu-item/icon-menu-item';

import {
    Dog,
    Cat,
    Bird,
    Squirrel,
} from 'lucide-react';

export default {
    component: Menu,
};

export const Default = {
    render: () => (
        <Menu>
            <DefaultMenuItem>Lorem ipsum</DefaultMenuItem>
            <DefaultMenuItem>Lorem ipsum</DefaultMenuItem>
            <DefaultMenuItem>Lorem ipsum</DefaultMenuItem>
        </Menu>
    ),
};

export const Destructive = {
    render: () => (
        <Menu>
            <DestructiveMenuItem>Lorem ipsum</DestructiveMenuItem>
            <DestructiveMenuItem>Lorem ipsum</DestructiveMenuItem>
            <DestructiveMenuItem>Lorem ipsum</DestructiveMenuItem>
        </Menu>
    ),
};

export const Icon = {
    render: () => (
        <Menu>
            <IconMenuItem>
                <Dog />

                Dog
            </IconMenuItem>
            <IconMenuItem>
                <Cat />

                Dog
            </IconMenuItem>
            <IconMenuItem>
                <Bird />

                Bird
            </IconMenuItem>
            <IconMenuItem>
                <Squirrel />

                Squirrel
            </IconMenuItem>
        </Menu>
    ),
};

