"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const RecipeSearchBar = () => {
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

  return (
    <div>
      <input
        className="text-black w-1/2 rounded px-2"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Enter Search Term"
        defaultValue={searchParams.get("query")?.toString()}
      ></input>
      {/* <button className="bg-lime-500 hover:bg-lime-600 rounded mx-3 px-3">
        Enter
      </button> */}
      <select className="text-black rounded px-2">
        Name
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
