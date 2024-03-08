import Image from "next/image";
import logo from "@/images/ko-mi_logo_1.png";

export default function Header() {
  return (
    <div className="bg-green pb-6 pt-4">
      <span className="flex justify-center pr-8 pb-2">
        <a href="/">
          <Image src={logo} alt="ko-mi logo" width={100} height={100}></Image>
        </a>
        <h1 className="pt-8 pb-4 font-bold text-5xl italic text-lime-500">
          <a href="/">Ko-Mi</a>
        </h1>
      </span>
      <span className="mt-4">
        <a className="sm:text-xl px-6 hover:text-lime-600" href="/">
          Home
        </a>
        <a className="sm:text-xl px-6 hover:text-lime-600" href="/add-recipe">
          Add Recipe
        </a>
        <a
          className="sm:text-xl px-6 hover:text-lime-600"
          href="/shopping-list"
        >
          Shopping List
        </a>
      </span>
    </div>
  );
}
