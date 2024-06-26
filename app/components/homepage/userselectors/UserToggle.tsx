"use client";
import { Switch } from "@mui/material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";

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
    <div className="pb-2">
      <button
        className={
          !all
            ? "mx-4 underline hover:text-lime-600"
            : "mx-4 hover:text-lime-600"
        }
        onClick={toggleMyRecipes}
      >
        <PersonIcon className="pr-2" />
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
        <PeopleIcon className="pr-2" />
        All Recipes
      </button>
    </div>
  );
}
