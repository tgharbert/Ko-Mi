type Ingredient = {
  name: string;
  ingredientId: number;
  checked: boolean;
};

const IngredientNode = ({ ingredient }: { ingredient: Ingredient }) => {
  console.log("ingredient: ", ingredient);

  // update the styling based on the 'checked' value

  // add radio to change 'checked' value
  // How to keep this in sync between client and db???

  return (
    <div>
      <li>{ingredient.name}</li>
    </div>
  );
};

export default IngredientNode;
