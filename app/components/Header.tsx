"use server";
import Image from "next/image";
import logo from "@/images/ko-mi_logo_1.png";

export default async function Header() {
  return (
    <header className="bg-green pb-4 sm:pb-6">
      <span className="flex justify-center pr-8 pb-2">
        <a href="/">
          <Image src={logo} alt="ko-mi logo" width={100} height={100}></Image>
        </a>
        <h1 className="pt-8 pb-4 font-bold text-5xl italic text-lime-500">
          <a href="/">Ko-Mi</a>
        </h1>
      </span>
      <nav className="grid grid-cols-3 gap-1 ">
        <a
          className="font-bold hover:text-lime-600 sm:text-xl sm:font-normal xl:ml-96 "
          href="/"
        >
          Recipes
        </a>
        <a
          className="font-bold hover:text-lime-600 sm:text-xl sm:font-normal xl:ml-40 xl:mr-40"
          href="/add-recipe"
        >
          Add Recipe
        </a>
        <a
          className="font-bold hover:text-lime-600 sm:text-xl sm:font-normal xl:mr-80"
          href="/shopping-list"
        >
          Shopping List
        </a>
      </nav>
    </header>
  );
}
