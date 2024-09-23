import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/mui-styles/styles";

function BackPageButton({ revertPage }: { revertPage: Function }) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          className="px-4 bg-lime-500"
          onClick={() => revertPage()}
          color="lime"
        >
          Previous
        </Button>
      </ThemeProvider>
    </div>
  );
}

export default BackPageButton;
