import PrimaryButton from './primary-button';
import OutlineButton from './outline-button';
import DestructiveButton from './destructive-button';

export default {
    component: PrimaryButton,
};

export const Primary = {
    render: () => <PrimaryButton>Lorem ipsum</PrimaryButton>,
};

export const Outline = {
    render: () => <OutlineButton>Lorem ipsum</OutlineButton>,
};

export const Destructive = {
    render: () => <DestructiveButton>Lorem ipsum</DestructiveButton>,
}
