/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
export function getRelativeTime(timestamp: string) {
    const now : any = new Date();
    const postDate : any = new Date(timestamp);
    const elapsed = now - postDate; // Difference in milliseconds

    // Convert to relative time units
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // Intl.RelativeTimeFormat to format the relative time
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (years > 0) return rtf.format(-years, "year");
    if (months > 0) return rtf.format(-months, "month");
    if (weeks > 0) return rtf.format(-weeks, "week");
    if (days > 0) return rtf.format(-days, "day");
    if (hours > 0) return rtf.format(-hours, "hour");
    if (minutes > 0) return rtf.format(-minutes, "minute");
    return rtf.format(-seconds, "second");
  }