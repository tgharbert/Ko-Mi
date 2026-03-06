"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

function PageNavigation({
  currentPage,
  numberOfResults,
}: {
  currentPage: number;
  numberOfResults: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleNextPageClick = (page: number) => {
    page++;
    const params = new URLSearchParams(searchParams);
    const newPage = String(page);
    params.set("page", newPage);
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePreviousPageClick = (page: number) => {
    page--;
    const params = new URLSearchParams(searchParams);
    const newPage = String(page);
    params.set("page", newPage);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-4">
      <div>
        {currentPage > 1 ? (
          <button
            onClick={() => handlePreviousPageClick(currentPage)}
            aria-label="Previous page"
            className="hover:text-accent"
          >
            <ChevronLeft size={28} />
          </button>
        ) : (
          ""
        )}
        <span className="text-lg italic">Page {currentPage}</span>
        {numberOfResults < 9 ? (
          ""
        ) : (
          <button
            onClick={() => handleNextPageClick(currentPage)}
            aria-label="Next page"
            className="hover:text-accent"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    </div>
  );
}

export default PageNavigation;
