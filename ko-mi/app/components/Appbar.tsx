"use client";
import SignInButton from "./SignInButton";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";

const Appbar = () => {
  const pathname = usePathname();
  // const route = useRouter();
  return (
    <header className="flex gap-4 p-4">
      {pathname.includes("/login") ? "" : <SignInButton />}
    </header>
  );
};

export default Appbar;
