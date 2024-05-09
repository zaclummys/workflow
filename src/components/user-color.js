import { twMerge } from 'tailwind-merge';

function getUserColorClassName (color) {
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
            throw new Error(`Unknown color: ${color}`);
    }
}

export default function UserColor ({ color }) {
    const colorClassName = getUserColorClassName(color);

    return (
        <div className={twMerge('w-full h-full rounded-full bg-primary', colorClassName)} />
    );
}
