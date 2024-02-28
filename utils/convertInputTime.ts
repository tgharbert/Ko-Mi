const convertTime = (inputHours: string, inputMinutes: string) => {
  const hrs = parseInt(inputHours, 10) || 0;
  const minutes = parseInt(inputMinutes, 10) || 0;

  const totalMinutes = hrs * 60 + minutes;
  const iso8601Duration = `PT${totalMinutes}M`;

  return iso8601Duration;
}

export default convertTime;