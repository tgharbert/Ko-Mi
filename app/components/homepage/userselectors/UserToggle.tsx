"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Users, User } from "lucide-react";

export default function UserToggle() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  let all = searchParams.get("all");

  const toggleAllRecipes = () => {
    const params = new URLSearchParams(searchParams);
    params.set("all", "true");
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  };

  const toggleMyRecipes = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("all");
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center">
      <button
        className={
          !all
            ? "mx-4 underline hover:text-lime-600"
            : "mx-4 hover:text-lime-600"
        }
        onClick={toggleMyRecipes}
      >
        <User className="pr-2 inline" size={20} />
        My Recipes
      </button>
      <button
        className={
          all
            ? "mx-4 underline hover:text-lime-600"
            : "mx-4 hover:text-lime-600"
        }
        onClick={toggleAllRecipes}
      >
        <Users className="pr-2 inline" size={20} />
        All Recipes
      </button>
    </div>
  );
}
