"use client";
import { useState, useEffect } from "react";
import theme from "@/mui-styles/styles";
import { ThemeProvider } from "@mui/material/styles";
import IngredientNode from "./IngredientNode";
import LoadingPage from "../../components/Loading";
import AddListItemBar from "./NewIngredientBar";
import { deleteUserIngredients, getUserIngredients } from "@/lib/ingredients";
import { deleteCheckedIngredients } from "@/lib/deleteCheckedIngredients";
import { addItemToList } from "@/lib/addItemToList";
import TopStack from "./TopStack";
import IngredientList from "./IngredientList";
// import getIngredients from "@/app/shopping-list/actions/handleDeleteIngredients";

function IngredientsList({ ingredients }: { ingredients: Ingredients[] }) {
  // const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState("");

  // console.log(ingredients);

  const getIngredients = async () => {
    try {
      setIsLoading(true);
      const ingredientData: any = await getUserIngredients();
      // setIngredients(ingredientData);
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
          {/* REFACTOR INTO SUB COMPONENTS */}
          <TopStack
            handleDeleteChecked={handleDeleteChecked}
            handleDeleteIngredients={handleDeleteIngredients}
          />
          {isLoading ? (
            <LoadingPage />
          ) : (
            // SUBLIST COMPONENT
            <IngredientList ingredients={ingredients} />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default IngredientsList;
