import { twMerge } from 'tailwind-merge';

function getBackgroundClassName (color) {
    switch (color) {
        case 'red':
            return 'bg-user-red';

        case 'orange':
            return 'bg-user-orange';

        case 'yellow':
            return 'bg-user-yellow';

        case 'green':
            return 'bg-user-green';

        case 'indigo':
            return 'bg-user-indigo';

        case 'purple':
            return 'bg-user-purple';

        case 'pink':
            return 'bg-user-pink';

        case 'blue':
            return 'bg-user-blue';
        
        default:
            return 'bg-user-gray';
    }
}

export default function UserColor ({
    user,
    className,
}) {
    const backgroundClassName = getBackgroundClassName(user.color);

    return (
        <div
            title={user.name}
            className={twMerge('w-full h-full rounded-full', backgroundClassName, className)} />
    );
}
