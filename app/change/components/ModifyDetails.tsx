"use client";
import React, { useState } from "react";
import convertISO8601ToTimeString from "@/utils/convertToTimeString";
import updateDetails from "../data/updateDetails";
import convertTime from "@/utils/convertInputTime";
import Button from "@mui/material/Button";

const ModifyDetails = ({
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
  const oldYieldStr = String(recipeYield);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newYield, setNewYield] = useState<string>(oldYieldStr);
  const [newMinutes, setNewMinutes] = useState<string>("");
  const [newHours, setNewHours] = useState<string>("");

  // write a form action that gets the values for the form and sends it to the server
  function modifyDetails(e: React.MouseEvent) {
    e.preventDefault();
    const writtenTime = convertTime(newHours, newMinutes);
    const strYield = String(newYield);
    updateDetails(newDescription, strYield, writtenTime, id);
  }

  // wrap all of this into a single function and put it in utils
  const timeString = convertISO8601ToTimeString(time);
  const timeArr = timeString.split(" ");

  const getHours = (timeArr: string[]) => {
    let hoursIdx = timeArr.indexOf("hours") - 1;
    if (timeArr.indexOf("hours") < 0) {
      hoursIdx = timeArr.indexOf("hour") - 1;
    }
    const hours = timeArr[hoursIdx];
    if (hours) {
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
    <>
      <textarea
        className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full h-40"
        name="description"
        defaultValue={description}
        onChange={(e) => setNewDescription(e.target.value)}
      ></textarea>
      <div className="mb-2">
        <select
          defaultValue={recipeYield}
          className="mr-2 border-2 border-primary rounded-lg px-3 text-black"
          name="yield"
          onChange={(e) => setNewYield(e.target.value)}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} defaultValue={String(index + 1)}>
              {String(index + 1)}
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
          onChange={(e) => setNewHours(e.target.value)}
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
          onChange={(e) => setNewMinutes(e.target.value)}
        ></input>
        <label>Minutes</label>
      </div>
      <Button
        className="bg-lime-500 px-4"
        variant="contained"
        color="lime"
        onClick={modifyDetails}
      >
        Update Details
      </Button>
    </>
  );
};

export default ModifyDetails;
