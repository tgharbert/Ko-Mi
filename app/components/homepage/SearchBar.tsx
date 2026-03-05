"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function RecipeSearchBar({
  category,
  currentPage,
}: {
  category: string;
  currentPage: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    currentPage = 1;
    const newPage = String(currentPage);

    // trim the final space from term - mobile devices often add one automatically
    term = term.endsWith(" ") ? term.slice(0, -1) : term;

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
    <div className="pb-4 flex items-center justify-center gap-2 max-w-lg mx-auto px-4">
      <input
        className="flex-1 rounded-md bg-primary/40 text-tertiary placeholder-tertiary/40 px-4 py-2 border border-white/10 focus:border-accent focus:outline-none"
        autoFocus
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Enter Search Term"
        defaultValue={searchParams.get("query")?.toString()}
      />
      <select
        className="bg-secondary hover:bg-red-700 text-tertiary rounded-md px-4 py-2 transition-colors"
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
}

export default RecipeSearchBar;
