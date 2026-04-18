export function formatTimeAgo (date) {
    if (!date) return "";
    
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    // Past/Now logic
    if (diffInSeconds < 60) return "just now";

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const counter = Math.floor(diffInSeconds / secondsInUnit);
        if (counter >= 1) {
            return counter === 1 ? `1 ${unit} ago` : `${counter} ${unit}s ago`;
        }
    }

    return "just now";
};
