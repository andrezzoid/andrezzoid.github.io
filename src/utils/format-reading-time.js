export default function formatReadingTime(minutes) {
  return `${minutes} ${minutes === 1 ? "minute" : "minutes"} read`
}
