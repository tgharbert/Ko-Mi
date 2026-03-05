"use client";
import { Menu, LogOut } from "lucide-react";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useClickOutside } from "@/app/hooks/useClickOutside";

export default function MainDropDownMenu() {
  const { isOpen, toggle, close, ref } = useClickOutside();

  return (
    <div className="-mt-2 relative" ref={ref}>
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggle}
        aria-label="open-menu"
        className="p-1"
      >
        <Menu className="text-white" size={28} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full bg-white rounded shadow-lg z-50 min-w-[140px] py-1">
          <Link href="/friends">
            <button onClick={close} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black">
              Friends
            </button>
          </Link>
          <Link href="/about">
            <button onClick={close} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black">
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
