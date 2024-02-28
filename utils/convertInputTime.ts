const convertTime = (inputHours: string, inputMinutes: string) => {
  // const [hoursString, minutesString] = durationString.split(':');
  const hrs = parseInt(inputHours, 10) || 0;
  console.log('hours in the function', hrs)
  const minutes = parseInt(inputMinutes, 10) || 0;
  console.log('minutes in the function', minutes)

  const totalMinutes = hrs * 60 + minutes;

  const iso8601Duration = `PT${totalMinutes}M`;

  return iso8601Duration;
}

export default convertTime;