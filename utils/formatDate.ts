 export const formatDate = (date: string, showDate: boolean = true) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    return showDate ? ` ${dateObj.toDateString()} (${formattedTime})` : formattedTime;
    };