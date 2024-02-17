"use client";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const PageNavigation = ({ currentPage }: { currentPage: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleNextPageClick = (page: number) => {
    page++;
    const params = new URLSearchParams(searchParams);
    const newPage = String(page);
    console.log(newPage);
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
          <NavigateBeforeIcon
            fontSize="large"
            className="cursor-pointer"
            onClick={() => handlePreviousPageClick(currentPage)}
          />
        ) : (
          ""
        )}
        <span className="text-lg italic">Page {currentPage}</span>
        <NavigateNextIcon
          fontSize="large"
          className="cursor-pointer"
          onClick={() => handleNextPageClick(currentPage)}
        />
      </div>
    </div>
  );
};

export default PageNavigation;
