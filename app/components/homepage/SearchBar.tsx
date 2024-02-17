"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const RecipeSearchBar = ({ category }: { category: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // debouncing here to limit calls - having an issue where the page is refreshing on debounce
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const handleCategory = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("category", term);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="pb-4">
      <input
        className="text-black w-1/2 rounded px-4 pt-1 pb-1 "
        autoFocus
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Enter Search Term"
        defaultValue={searchParams.get("query")?.toString()}
      ></input>
      <select
        className="bg-lime-500 hover:bg-lime-600 rounded ml-2 px-2 pt-1 pb-1"
        onChange={(e) => {
          handleCategory(e.target.value);
        }}
        defaultValue={category || "Name"}
      >
        <option>Name</option>
        <option>Ingredient</option>
        <option>Keyword</option>
        <option>Author</option>
        <option>Publisher</option>
      </select>
    </div>
  );
};

export default RecipeSearchBar;
