// import the plus icon
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import IngredientField from "./IngredientField";

const AddIngredients = ({
  addIngredient,
  ingredients,
}: {
  addIngredient: Function;
  ingredients: string[];
}) => {
  const [ingredient, setIngredient] = useState("");

  const ingredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value);
  };

  return (
    <div>
      <form>
        <label>Ingredients:</label>
        {ingredients.map((ingredient: string, idx) => {
          return <p key={idx}>{ingredient}</p>;
        })}
        <IngredientField
          ingredientChange={ingredientChange}
          ingredient={ingredient}
        />
        <button onClick={(e) => addIngredient(e, ingredient)}>
          <label>Add Ingredient: </label>
          <AddIcon />
        </button>
      </form>
    </div>
  );
};

export default AddIngredients;
