"use client";
import { useState, useEffect } from "react";
import IngredientNode from "./IngredientNode";
import LoadingPage from "../Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCheckedIngredients } from "@/lib/deleteCheckedIngredients";
import { deleteUserIngredients, getUserIngredients } from "@/lib/ingredients";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/mui-styles/styles";

const IngredientsList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getIngredients = async () => {
    try {
      setIsLoading(true);
      const ingredientData: any = await getUserIngredients();
      setIngredients(ingredientData);
      // display a success message??
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      // should set an error message in the DOM
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const handleDeleteIngredients = async () => {
    try {
      await deleteUserIngredients();
      await getIngredients();
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const handleDeleteChecked = async () => {
    await deleteCheckedIngredients();
    await getIngredients();
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* add the bar here? */}
        <div>
          <div className="pb-8">
            <Stack
              // spacing={2}
              direction="row"
              className="flex justify-center content-center "
            >
              <Button
                variant="contained"
                className=" bg-lime-500"
                onClick={handleDeleteChecked}
                color="lime"
              >
                <DeleteIcon className="" />
                Delete Checked
              </Button>
              <div className="px-4">
                <Button
                  variant="contained"
                  className="bg-lime-500"
                  onClick={handleDeleteIngredients}
                  color="lime"
                >
                  <DeleteIcon className="" />
                  Delete All
                </Button>
              </div>
            </Stack>
          </div>
          {/* SHOULD BE AN INFINITE SCROLL?? */}
          {isLoading ? (
            <LoadingPage />
          ) : (
            <div className="flex-col">
              <ul>
                {ingredients.map((ingredient: Ingredient) => {
                  return (
                    <IngredientNode
                      key={ingredient.id}
                      ingredient={ingredient}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default IngredientsList;
