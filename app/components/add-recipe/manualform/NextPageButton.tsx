import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/mui-styles/styles";

const NextPageButton = ({ pageChange }: { pageChange: Function }) => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          className="px-4 bg-lime-500"
          onClick={() => pageChange()}
          color="lime"
        >
          Next Page
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default NextPageButton;
