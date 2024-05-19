import { formatDistanceToNow } from 'date-fns';

export default function DateAgo ({ date }) {
    if (!date) {
        return null;
    }
    
    const distance = formatDistanceToNow(date, {
        addSuffix: true,
    });

    return (
        <time
            title={date.toLocaleDateString('en-US')}
            dateTime={date.toISOString()}>
            {distance}
        </time>
    );
}