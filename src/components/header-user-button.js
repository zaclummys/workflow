import UserColor from '~/components/user-color';

export default function HeaderUserButton ({
    user,
    onClick,
}) {
    return (
        <button
            className="flex flex-row items-center gap-2 px-3 py-3 rounded hover:bg-[var(--surface-hover-layer)] active:bg-[var(--surface-press-layer)] transition-colors"
            onClick={onClick}>
            <div className="w-8 h-8">
                <UserColor
                    color={user.color} />
            </div>            

            <span className="text-base font-normal">
                {user.name}
            </span>
        </button>
    );
}
