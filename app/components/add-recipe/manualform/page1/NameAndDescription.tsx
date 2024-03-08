import { useState, useEffect } from "react";
import NewRecipeYieldDropdown from "./NewYieldDropdown";
import CookTimeInput from "./CookTimeInput";

const NameAndDescription = ({
  nameChange,
  descriptionChange,
  name,
  description,
  servingsChange,
  servingSize,
  formatTime,
}: {
  nameChange: Function;
  descriptionChange: Function;
  servingsChange: Function;
  name: string;
  description: string;
  servingSize: string;
  formatTime: Function;
}) => {
  const [minutes, setMinutes] = useState("0");
  const [hours, setHours] = useState("0");

  const minutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(e.target.value);
  };

  useEffect(() => {
    formatTime(hours, minutes);
  }, [hours, minutes, formatTime]);

  const hoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHours(e.target.value);
  };

  return (
    <div className=" justify-center w-4/5">
      <form>
        <div className="pb-4">
          <p>Recipe Name:</p>
          <input
            className="text-black rounded-lg px-4 pt-1 pb-1 border-2 border-primary w-full"
            type="text"
            placeholder="Recipe Name"
            autoFocus
            value={name}
            onChange={(e) => nameChange(e)}
          />
        </div>
        <div className="pb-4">
          <p>Recipe Description:</p>
          <textarea
            className="text-black rounded-lg px-4 pt-1 pb-1 border-2 border-primary w-full"
            placeholder="Recipe Description"
            value={description}
            onChange={(e) => descriptionChange(e)}
          />
        </div>
        <div className="pb-4 ">
          <label>Cook Time:</label>
          <span className="flex justify-center ">
            <CookTimeInput
              units={hours}
              valueChange={hoursChange}
              text={"hours"}
            />
            <CookTimeInput
              units={minutes}
              valueChange={minutesChange}
              text={"minutes"}
            />
          </span>
        </div>
        <label>Servings:</label>
        <NewRecipeYieldDropdown
          servingsChange={servingsChange}
          servingSize={servingSize}
        />
      </form>
    </div>
  );
};

export default NameAndDescription;
