"use client";
import { useState, useEffect } from "react";
import IngredientNode from "./IngredientNode";
import LoadingPage from "../Loading";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deleteCheckedIngredients } from "@/lib/deleteCheckedIngredients";
import { deleteUserIngredients, getUserIngredients } from "@/lib/ingredients";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// should extract this into another folder and export 'theme'

declare module "@mui/material/styles" {
  interface Palette {
    lime: Palette["primary"];
  }

  interface PaletteOptions {
    lime?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    lime: true;
  }
}

const theme = createTheme({
  palette: {
    lime: {
      main: "#84CC16",
      light: "#65A30D",
      dark: "#65A30D",
      contrastText: "#F7F9F9",
    },
  },
});

const IngredientsList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getIngredients = async () => {
    try {
      setIsLoading(true);
      const ingredientData = await getUserIngredients();
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
        <div>
          <div className="pb-8">
            {/* <button
            onClick={handleDeleteChecked}
            className=" mr-4 bg-lime-500 rounded px-3"
            >
            <ClearIcon />
            Delete Checked
          </button> */}
            {/* Adjust this with MUI button! */}
            <Stack
              // spacing={2}
              direction="row"
              className="flex justify-center content-center px-4"
            >
              <Button
                variant="contained"
                className="px-4 bg-lime-500"
                onClick={handleDeleteChecked}
                color="lime"
              >
                Delete Checked
              </Button>
              <Button
                variant="contained"
                className="bg-lime-500"
                onClick={handleDeleteIngredients}
                color="lime"
              >
                Delete All
              </Button>
            </Stack>
            {/* <button
            onClick={handleDeleteIngredients}
            className=" ml-4 bg-lime-500 px-3 rounded"
            >
            Delete All Items
            <DeleteIcon />
          </button> */}
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
