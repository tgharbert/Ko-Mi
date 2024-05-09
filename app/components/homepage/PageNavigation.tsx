"use client";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
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
          <span className="hover:text-lime-500">
            <NavigateBeforeIcon
              fontSize="large"
              className="cursor-pointer"
              onClick={() => handlePreviousPageClick(currentPage)}
            />
          </span>
        ) : (
          ""
        )}
        <span className="text-lg italic">Page {currentPage}</span>
        {numberOfResults < 9 ? (
          ""
        ) : (
          <span className="hover:text-lime-500">
            <NavigateNextIcon
              fontSize="large"
              className="cursor-pointer "
              onClick={() => handleNextPageClick(currentPage)}
            />
          </span>
        )}
      </div>
    </div>
  );
}

export default PageNavigation;
