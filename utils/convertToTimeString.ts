function convertISO8601ToTimeString(duration: string): string {
  const regex = /P(?:(\d+)H)?T(?:(\d+)H)?(?:(\d+)M)?/;
  const matches = duration.match(regex);

  if (!matches) return "Invalid format";

  let hours = matches[2] ? parseInt(matches[2]) : 0;
  let minutes = matches[3] ? parseInt(matches[3]) : 0;

  if (hours === 0 && minutes === 0) return "0 minutes";

  let timeString = "";
  if (hours > 0) timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
  if (minutes > 0) timeString += `${minutes} minute${minutes > 1 ? 's' : ''}`;

  return timeString.trim();
}

export default convertISO8601ToTimeString
