import { useState } from "react";
import { addIngredients } from "@/lib/addIngredients";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/mui-styles/styles";

export default function YieldDropdown({
  recipeYield,
  recipeIngredients,
  handleClose,
}: {
  recipeYield: number;
  recipeIngredients: Ingredient[];
  handleClose: Function;
}) {
  const [multiplier, setMultiplier] = useState<number>(1);

  const handleAddIngredients = async (
    ingredients: Ingredient[],
    multiplier: number
  ) => {
    addIngredients(ingredients, multiplier);
    handleClose();
  };
  console.log(multiplier);

  // on click the ingredients are sent to the db where the multiplier will be applied...
  return (
    <div className="flexbox justify-center content-center pb-4 px-8">
      <div className="pb-4 px-8 flex justify-center content-center ">
        <select
          onChange={(e) => setMultiplier(Number(e.target.value))}
          defaultValue={1}
          className="mr-2 border-2 border-primary rounded px-3"
        >
          <option value={0.25}>{recipeYield / 4}</option>
          <option value={0.5}>{recipeYield / 2}</option>
          <option value={1}>{recipeYield}</option>
          <option value={1.5}>{recipeYield * 1.5}</option>
          <option value={2}>{recipeYield * 2}</option>
        </select>
        <label className="ml-2">Servings</label>
      </div>
      <div className="flex justify-center content-center">
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            className="px-4 bg-lime-500"
            onClick={() => handleAddIngredients(recipeIngredients, multiplier)}
            color="lime"
          >
            Add Ingredients
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
}
