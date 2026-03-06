"use client";
import { ReactNode } from "react";

function PrimaryButton({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "default",
}: {
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  type?: "button" | "submit";
  variant?: "default" | "danger";
}) {
  const colorClasses = variant === "danger"
    ? "bg-secondary hover:bg-red-700"
    : "bg-pop hover:bg-pop/80";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${colorClasses} active:scale-95 text-tertiary px-3 py-1.5 rounded whitespace-nowrap transition-all duration-150 ${className}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
