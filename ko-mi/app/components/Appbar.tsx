"use client";
import SignInButton from "./SignInButton";
import { usePathname } from "next/navigation";

const Appbar = () => {
  const pathname = usePathname();
  return (
    <header className="flex gap-4 p-4">
      {pathname.includes("/login") ? "" : <SignInButton />}
    </header>
  );
};

export default Appbar;
