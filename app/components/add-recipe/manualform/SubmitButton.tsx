import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/mui-styles/styles";

const SubmitButton = ({ submitRecipe }: { submitRecipe: Function }) => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          className="px-4 bg-lime-500"
          onClick={() => submitRecipe()}
          color="lime"
        >
          Submit Recipe
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default SubmitButton;
