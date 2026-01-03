/**
 * Converts strings like:
 * "13 secs ago (Jan-02-2026 01:44:56 PM +UTC)"
 * to a Unix timestamp (seconds)
 */
export function toEthereumTimestamp(input: string): number {
  // Extract "13 secs"
  const secondsAgoMatch = input.match(/(\d+)\s*sec/);
  if (!secondsAgoMatch) {
    throw new Error("Invalid input: cannot find seconds ago");
  }

  const secondsAgo = parseInt(secondsAgoMatch[1], 10);

  // Extract date inside parentheses
  const dateMatch = input.match(/\((.*?)\)/);
  if (!dateMatch) {
    throw new Error("Invalid input: cannot find date");
  }

  const baseDate = new Date(dateMatch[1]);

  if (isNaN(baseDate.getTime())) {
    throw new Error("Invalid date format");
  }

  // Subtract seconds
  const timestampSeconds = Math.floor((baseDate.getTime() - secondsAgo * 1000) / 1000);

  return timestampSeconds;
}

const input = "13 secs ago (Jan-02-2026 01:44:56 PM +UTC)";

const ts = toEthereumTimestamp(input);

console.log(ts);
