"use client";
import { useState, useEffect } from "react";
import theme from "@/mui-styles/styles";
import { ThemeProvider } from "@mui/material/styles";
import LoadingPage from "../../components/Loading";
import AddListItemBar from "./NewIngredientBar";
import { deleteUserIngredients } from "@/lib/ingredients";
import { deleteCheckedIngredients } from "@/lib/deleteCheckedIngredients";
import TopStack from "./TopStack";
import IngredientList from "./IngredientList";

function IngredientsList({
  ingredients,
  submitItem,
  getIngredients,
}: {
  ingredients: IngredientWithLocation[];
  submitItem: Function;
  getIngredients: Function;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState("");

  useEffect(() => {
    getIngredients();
    setIsLoading(false);
  }, [getIngredients]);

  const handleDeleteIngredients = async () => {
    try {
      setIsLoading(true);
      await deleteUserIngredients();
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const handleDeleteChecked = async () => {
    try {
      setIsLoading(true);
      await deleteCheckedIngredients();
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true);
    submitItem(item);
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
          <TopStack
            handleDeleteChecked={handleDeleteChecked}
            handleDeleteIngredients={handleDeleteIngredients}
          />
          {isLoading ? (
            <LoadingPage />
          ) : (
            <IngredientList ingredients={ingredients} />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default IngredientsList;
