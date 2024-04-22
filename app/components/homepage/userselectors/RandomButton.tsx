"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/mui-styles/styles";
import ShuffleIcon from "@mui/icons-material/Shuffle";

function RandomButton({ random }: { random: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const randomClick = () => {
    const params = new URLSearchParams(searchParams);
    random = String(Date.now());
    params.set("random", random);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="mb-4">
        <Button
          variant="contained"
          className=" bg-lime-500"
          onClick={() => randomClick()}
          color="lime"
        >
          Randomize
          <ShuffleIcon className="ml-2" />
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default RandomButton;
