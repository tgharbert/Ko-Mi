"use server";
import Image from "next/image";
import logo from "@/images/ko-mi_logo_1.png";
import NavLink from "./NavLink";

export default async function Header() {
  return (
    <header className="bg-primary pb-2 sm:pb-4">
      <div className="flex justify-center items-center gap-1 pb-4">
        <a href="/">
          <Image src={logo} alt="ko-mi logo" width={80} height={80} />
        </a>
        <h1 className="font-bold text-4xl sm:text-5xl italic text-pop">
          <a href="/">Ko-Mi</a>
        </h1>
      </div>
      <nav className="flex justify-center gap-2 sm:gap-4 px-6 sm:px-4">
        <NavLink href="/" label="Recipes" icon="utensils" />
        <NavLink href="/add-recipe" label="Add Recipe" icon="plus" />
        <NavLink href="/shopping-list" label="Shopping List" icon="cart" />
      </nav>
    </header>
  );
}
