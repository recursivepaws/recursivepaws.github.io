export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    // Sanity dates are plain dates; local time would shift them back a day
    timeZone: "UTC",
  });
}
