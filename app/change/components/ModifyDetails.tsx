import convertISO8601ToTimeString from "@/utils/convertToTimeString";
import updateDetails from "../data/updateDetails";
import convertTime from "@/utils/convertInputTime";
const ModifyDetails = async ({
  id,
  description,
  recipeYield,
  time,
}: {
  id: number;
  description: string;
  recipeYield: number;
  time: string;
}) => {
  // write a form action that gets the values for the form and sends it to the server
  async function modifyDetails(formData: FormData) {
    "use server";
    const rawFormData = {
      description: formData.get("description") as string,
      yield: formData.get("yield") as string,
      hours: formData.get("hours") as string,
      minutes: formData.get("minutes") as string,
    };

    const writtenTime = convertTime(rawFormData.hours, rawFormData.minutes);

    await updateDetails(
      rawFormData.description,
      rawFormData.yield,
      writtenTime,
      id
    );
  }

  // function convertISO8601ToTimeString(duration: string): string {
  //   const regex = /PT(\d+)M/; // Matches the number of minutes in the format PTXXXM
  //   const matches = duration.match(regex);

  //   if (!matches) return "Invalid format";

  //   const totalMinutes = parseInt(matches[1]);
  //   const hours = Math.floor(totalMinutes / 60);
  //   const minutes = totalMinutes % 60;

  //   let timeString = "";
  //   if (hours > 0) timeString += `${hours} hour${hours > 1 ? "s" : ""} `;
  //   if (minutes > 0) timeString += `${minutes} minute${minutes > 1 ? "s" : ""}`;

  //   return timeString.trim();
  // }

  // wrap all of this into a single function and put it in utils
  const timeString = convertISO8601ToTimeString(time);
  const timeArr = timeString.split(" ");

  const getHours = (timeArr: string[]) => {
    const hoursIdx = timeArr.indexOf("hours") - 1;
    const hours = timeArr[hoursIdx];
    if (hours) {
      console.log("hours: ", hours);
      return hours;
    }
    return "0";
  };

  const getMinutes = (timeArr: string[]) => {
    const minsIdx = timeArr.indexOf("minutes") - 1;
    const minutes = timeArr[minsIdx];
    if (minutes) {
      return minutes;
    }
    return "0";
  };
  let mins = getMinutes(timeArr);
  let hours = getHours(timeArr);

  return (
    <div>
      <form action={modifyDetails}>
        <textarea
          className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-96"
          name="description"
          defaultValue={description}
        ></textarea>
        <div className="mb-2">
          <select
            defaultValue={recipeYield}
            className="mr-2 border-2 border-primary rounded-lg px-3 text-black"
            name="yield"
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index} defaultValue={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <label>Servings</label>
        </div>

        <div className="mb-2">
          <label className="mx-2">Cook Time: </label>
          <input
            type="number"
            className="text-black rounded-lg border-2 border-primary pl-2"
            id="hours"
            name="hours"
            min="0"
            max="24"
            step="1"
            defaultValue={hours}
          ></input>
          <label className="mr-1 ml-1">Hours</label>
          <input
            type="number"
            className="text-black rounded-lg border-2 border-primary pl-2"
            id="minutes"
            name="minutes"
            min="0"
            max="60"
            step="1"
            defaultValue={mins}
          ></input>
          <label>Minutes</label>
        </div>
        <button
          type="submit"
          className="ml-2 pt-1 pb-1 text-bold bg-secondary hover:bg-lime-600 rounded-lg px-4 text-white"
        >
          Update Details
        </button>
      </form>
    </div>
  );
};

export default ModifyDetails;
