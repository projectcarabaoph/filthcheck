export const formatResponseTime = (ms: number): string => {
    if (ms < 1000) {
        return `${ms.toFixed(0)} ms`;
    } else if (ms < 60000) {
        const seconds = (ms / 1000).toFixed(2);
        return `${seconds} s`;
    } else if (ms < 3600000) {
        const minutes = (ms / 60000).toFixed(2);
        return `${minutes} m`;
    } else if (ms < 86400000) {
        const hours = (ms / 3600000).toFixed(2);
        return `${hours} h`;
    } else {
        const days = (ms / 86400000).toFixed(2);
        return `${days} d`;
    }
}