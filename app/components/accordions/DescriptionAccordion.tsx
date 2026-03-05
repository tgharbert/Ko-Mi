"use client";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function DescriptionAccordion({ description }: { description: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white text-black">
      <button
        onClick={() => setOpen(!open)}
        aria-controls="description-content"
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 font-semibold text-left"
      >
        Recipe Description
        <ExpandMoreIcon
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id="description-content"
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-4">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default DescriptionAccordion;
