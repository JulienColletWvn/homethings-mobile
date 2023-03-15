export const getElapsedTimeString = ({ date }) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds > 60 * 60) {
    const hours = Math.round(seconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (seconds > 60) {
    const minutes = Math.round(seconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
};
