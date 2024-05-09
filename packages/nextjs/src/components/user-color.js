import { twMerge } from 'tailwind-merge';

function getUserColorClassName (color) {
    switch (color) {
        case 'red':
            return 'bg-var(--color-user-red)';

        case 'orange':
            return 'bg-var(--color-user-orange)';

        case 'yellow':
            return 'bg-var(--color-user-yellow)';

        case 'green':
            return 'bg-var(--color-user-green)';

        case 'indigo':
            return 'bg-var(--color-user-indigo)';

        case 'purple':
            return 'bg-var(--color-user-purple)';

        case 'pink':
            return 'bg-var(--color-user-pink)';

        case 'blue':
            return 'bg-var(--color-user-blue)';
        
        default:
            throw new Error(`Unknown color: ${color}`);
    }
}

export default function UserColor ({ color }) {
    const colorClassName = getUserColorClassName(color);

    return (
        <div className={twMerge('rounded-full bg-primary', colorClassName)} />
    );
}
