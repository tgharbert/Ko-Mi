function convertISO8601ToTimeString(duration: string): string {
  const regex = /PT(\d+)M/; // Matches the number of minutes in the format PTXXXM
  const matches = duration.match(regex);

  if (!matches) return "Invalid format";

  const totalMinutes = parseInt(matches[1]);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let timeString = "";
  if (hours > 0) timeString += `${hours} hour${hours > 1 ? "s" : ""} `;
  if (minutes > 0) timeString += `${minutes} minute${minutes > 1 ? "s" : ""}`;

  return timeString.trim();
}

export default convertISO8601ToTimeString
