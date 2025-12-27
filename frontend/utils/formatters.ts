import { differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears } from 'date-fns';
//format a number t shorter format

export const formatNumberShort = (num: number): string => {
    if (num >= 1000000) {
        return Math.floor((num / 1000000)) + 'M';
    }
    if (num >= 1000) {
        return Math.floor((num / 1000)) + 'K';
    }
    return num.toString();
};

//format date to relative time like 5m, 2h, 3d, 1w, 2mo, 1y
export const formatRelativeTime = (dateString: Date): string => {
    const now = new Date();
    const date = new Date(dateString);
const minutes = differenceInMinutes(now, date);
const hours = differenceInHours(now, date);
const days = differenceInDays(now, date);
const weeks = differenceInWeeks(now, date);
const months = differenceInMonths(now, date);
const years = differenceInYears(now, date);

if(minutes < 1) return 'now';
if (minutes < 60) {
    return `${minutes}m`;

}
if (hours < 24) {
    return `${hours}h`;
}
if (days < 7) {
    return `${days}d`;
}
if (weeks < 4) {
    return `${weeks}w`;
}
if (months < 12) {
    return `${months}mo`;
}
return `${years}y`;
}