"use client";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function InstructionAccordion({ instructions }: { instructions: string[] }) {
  const [open, setOpen] = useState(false);
  const he = require("he");

  return (
    <div className="border border-gray-200 bg-white text-black">
      <button
        onClick={() => setOpen(!open)}
        aria-controls="instructions-content"
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 font-semibold text-left"
      >
        Method
        <ExpandMoreIcon
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id="instructions-content"
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-4">
          {instructions.map((instruction: string, idx) => {
            return (
              <div className="pb-2 pt-2" key={idx}>
                {he.decode(instruction)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InstructionAccordion;
