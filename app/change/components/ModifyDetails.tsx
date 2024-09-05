import convertISO8601ToTimeString from "@/utils/convertToTimeString";
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
      <form>
        <textarea
          className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-96"
          defaultValue={description}
        ></textarea>
        <div className="mb-2">
          <select
            // onChange={(e) => servingsChange(e.target.defaultValue)}
            defaultValue={recipeYield}
            // defaultValue={String(recipeYield)}
            className="mr-2 border-2 border-primary rounded-lg px-3 text-black"
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
            id="quantity"
            name="quantity"
            min="0"
            max="24"
            step="1"
            // defaultValue={time}
            defaultValue={hours}
            // onChange={(e) => valueChange(e)}
          ></input>
          <label className="mr-1 ml-1">Hours</label>
          <input
            type="number"
            className="text-black rounded-lg border-2 border-primary pl-2"
            id="quantity"
            name="quantity"
            min="0"
            max="60"
            step="1"
            // defaultValue={time}
            defaultValue={mins}
            // onChange={(e) => valueChange(e)}
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
