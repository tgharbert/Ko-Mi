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
            ? "mx-2 sm:mx-4 underline hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded"
            : "mx-2 sm:mx-4 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded"
        }
        onClick={toggleMyRecipes}
      >
        <User className="pr-2 inline" size={20} aria-hidden="true" />
        My Recipes
      </button>
      <button
        className={
          all
            ? "mx-2 sm:mx-4 underline hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded"
            : "mx-2 sm:mx-4 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded"
        }
        onClick={toggleAllRecipes}
      >
        <Users className="pr-2 inline" size={20} aria-hidden="true" />
        All Recipes
      </button>
    </div>
  );
}
