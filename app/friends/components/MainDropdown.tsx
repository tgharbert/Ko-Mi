"use client";
import { Menu, LogOut } from "lucide-react";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function MainDropDownMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="-mt-2 relative" ref={menuRef}>
      <button
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
        aria-label="open-menu"
        className="p-1"
      >
        <Menu className="text-white" size={28} />
      </button>
      {open && (
        <div className="absolute right-0 top-full bg-white rounded shadow-lg z-50 min-w-[140px] py-1">
          <Link href="/friends">
            <button onClick={handleClose} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black">
              Friends
            </button>
          </Link>
          <Link href="/about">
            <button onClick={handleClose} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black">
              About
            </button>
          </Link>
          <button onClick={() => signOut()} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black">
            Logout
            <LogOut className="pl-1 inline" size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
