"use client";
import { Switch } from "@mui/material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function UserToggle() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const toggleRecipes = () => {
    const params = new URLSearchParams(searchParams);
    params.set("all", "true");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <label>My Recipes</label>
      <Switch onChange={toggleRecipes} />
      <label>All Recipes</label>
    </div>
  );
}
