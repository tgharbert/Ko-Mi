"use client";
import { useState, useEffect } from "react";
import theme from "@/mui-styles/styles";
import { ThemeProvider } from "@mui/material/styles";
import IngredientNode from "./IngredientNode";
import LoadingPage from "../../components/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddListItemBar from "./NewIngredientBar";
import { deleteUserIngredients, getUserIngredients } from "@/lib/ingredients";
import { deleteCheckedIngredients } from "@/lib/deleteCheckedIngredients";
import { addItemToList } from "@/lib/addItemToList";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { Suspense } from "react";

function IngredientsList({ ingredients }: { ingredients: Ingredient[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState("");

  useEffect(() => {
    if (ingredients) {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteIngredients = async () => {
    try {
      await deleteUserIngredients();
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const handleDeleteChecked = async () => {
    try {
      await deleteCheckedIngredients();
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    await addItemToList(item);
    setItem("");
  };

  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AddListItemBar
          item={item}
          handleSubmit={handleItemSubmit}
          setValue={setValue}
        />
        <div>
          <div className="pb-4 mt-8">
            <Stack
              direction="row"
              className="flex justify-center content-center "
            >
              <Button
                variant="contained"
                className=" bg-lime-500"
                onClick={handleDeleteChecked}
                color="lime"
              >
                <PlaylistRemoveIcon className="mr-2" />
                Delete Checked
              </Button>
              <div className="px-4">
                <Button
                  variant="contained"
                  className="bg-lime-500"
                  onClick={handleDeleteIngredients}
                  color="lime"
                >
                  <DeleteIcon className="mr-2" />
                  Delete All
                </Button>
              </div>
            </Stack>
          </div>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <Suspense fallback={<LoadingPage />}>
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
            </Suspense>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default IngredientsList;
