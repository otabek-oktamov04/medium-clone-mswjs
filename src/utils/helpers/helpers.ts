import { useLocation } from "react-router-dom";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const daysDifference = calculateDaysDifference(now, date);

  if (daysDifference === 0) {
    return "today";
  } else if (daysDifference === 1) {
    return "1d ago";
  } else if (daysDifference < 7) {
    return `${daysDifference}d ago`;
  } else if (daysDifference < 30) {
    const weeks = Math.floor(daysDifference / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else {
    return formatOlderDate(date);
  }
}

function calculateDaysDifference(now: Date, past: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  return Math.floor((now.getTime() - past.getTime()) / oneDay);
}

function formatOlderDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

export const useGetSearchQuery = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return params.get("q") || ""; // Return the search term or an empty string
};
