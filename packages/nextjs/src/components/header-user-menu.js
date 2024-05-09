import signOutAction from '~/actions/guest/sign-out-action';

export default function HeaderUserMenu ({ onClick }) {
    const onSignOutButtonClick = async () => {
        await signOutAction();
    };

    return (
        <menu
            className="flex flex-col rounded bg-surface-high overflow-hidden"
            onClick={onClick}>
            <button className="py-3 px-6 text-left text-sm hover:bg-[var(--surface-high-hover-layer)] active:bg-[var(--surface-high-press-layer)] transition-colors">
                Edit personal information
            </button>

            <button className="py-3 px-6 text-left text-sm hover:bg-[var(--surface-high-hover-layer)] active:bg-[var(--surface-high-press-layer)] transition-colors">
                Change password
            </button>

            <button
                className="py-3 px-6 text-left text-sm text-danger hover:bg-[var(--surface-high-hover-layer)] active:bg-[var(--surface-high-press-layer)] transition-colors"
                onClick={onSignOutButtonClick}>
                Sign Out
            </button>
        </menu>
    );
}

