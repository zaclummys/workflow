import {
    subDays,
    formatDistance,
} from 'date-fns';

export function calculateTimeAgo (date) {
    if (date == null) {
        return null;
    }

    return formatDistance(date, new Date(), { addSuffix: true });
}
