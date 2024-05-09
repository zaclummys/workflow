import UserColor from '~/components/user-color';

export default function HeaderUserButton ({
    user,
    onClick,
}) {
    return (
        <button
            className="flex flex-row items-center gap-2 px-3 py-3 rounded hover:bg-[var(--surface-hover-layer)] active:bg-[var(--surface-press-layer)] transition-colors"
            onClick={onClick}>
            <UserColor
                color={user.color} />

            <span className="text-base font-normal">
                {user.name}
            </span>
        </button>
    );
}
