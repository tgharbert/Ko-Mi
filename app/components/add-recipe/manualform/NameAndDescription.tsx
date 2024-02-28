import { useState } from "react";
import NewRecipeYieldDropdown from "./NewYieldDropdown";
import CookTimeInput from "./CookTimeInput";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/mui-styles/styles";

const NameAndDescription = ({
  nameChange,
  descriptionChange,
  name,
  description,
  pageChange,
  servingsChange,
  servingSize,
  formatTime,
}: {
  nameChange: Function;
  descriptionChange: Function;
  pageChange: Function;
  servingsChange: Function;
  page: number;
  name: string;
  description: string;
  servingSize: string;
  formatTime: Function;
}) => {
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");

  const minutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMinutes(e.target.value);
    formatTime(hours, minutes);
    console.log(hours);
  };
  const hoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setHours(e.target.value);
    formatTime(hours, minutes);
    console.log(hours);
  };

  return (
    <div className="px-8 justify-center flex">
      <form>
        <div className="pb-4">
          <p className="pb-4">Enter your recipe info:</p>
          <label>Recipe Name:</label>
          <input
            className="text-black rounded px-4 pt-1 pb-1 "
            type="text"
            placeholder="Recipe Name"
            autoFocus
            value={name}
            onChange={(e) => nameChange(e)}
          />
        </div>
        <div className="pb-4">
          <label>Cook Time:</label>
          <textarea
            className="text-black rounded px-4 pt-1 pb-1 "
            placeholder="Recipe Description"
            value={description}
            onChange={(e) => descriptionChange(e)}
          />
        </div>
        <div className="pb-4">
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
        {/* this should be its own component and lifted... */}
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            className="px-4 bg-lime-500"
            onClick={() => pageChange()}
            color="lime"
          >
            Next Page
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default NameAndDescription;
