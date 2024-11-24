import {
    formatDistanceToNow, 
} from 'date-fns';

export default function DateAgo ({ date }) {
    if (!date) {
        return null;
    }
    
    const distance = formatDistanceToNow(date, {
        addSuffix: true,
    });

    const localeDate = date.toLocaleDateString('en-US');
    const localeTime = date.toLocaleTimeString('en-US');

    return (
        <time title={`${localeDate} ${localeTime}`}>
            {distance}
        </time>
    );
}