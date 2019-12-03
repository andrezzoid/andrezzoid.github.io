export default function formatReadingTime(minutes) {
  return `${minutes || 0} ${minutes <= 1 ? "minute" : "minutes"} read`
}
