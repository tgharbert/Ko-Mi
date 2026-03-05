"use client";
import { ReactNode } from "react";

function PrimaryButton({
  children,
  onClick,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-secondary hover:bg-red-700 text-tertiary px-4 py-2 rounded ${className}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
