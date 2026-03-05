"use client";
import { useState, ReactNode } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Accordion({
  title,
  children,
  maxHeight = "max-h-[1000px]",
}: {
  title: string;
  children: ReactNode;
  maxHeight?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white text-black">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 font-semibold text-left"
      >
        {title}
        <ExpandMoreIcon
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? `${maxHeight} opacity-100` : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
