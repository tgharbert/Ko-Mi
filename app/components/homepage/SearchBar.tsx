"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const RecipeSearchBar = ({
  category,
  currentPage,
}: {
  category: string;
  currentPage: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    currentPage = 1;
    const newPage = String(currentPage);

    if (term) {
      params.set("page", newPage);
      params.set("query", term);
      params.set("random", "false");
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const handleCategory = (term: string) => {
    const params = new URLSearchParams(searchParams);

    currentPage = 1;
    const newPage = String(currentPage);

    if (term) {
      params.set("page", newPage);
      params.set("category", term);
      params.set("random", "false");
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
        aria-label="filter categories"
      >
        <option value="name">Name</option>
        <option value="ingredient">Ingredient</option>
        <option value="keyword">Keyword</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
      </select>
    </div>
  );
};

export default RecipeSearchBar;
