type Ingredient = {
  name: string;
  ingredientId: number;
  checked: boolean;
};

const IngredientNode = ({ ingredient }: { ingredient: Ingredient }) => {
  // update the styling based on the 'checked' value

  // How to keep this in sync between client and db???

  return (
    <div className=" mx-4 pb-3">
      <li className="block mx-4 pb-3">
        <input className="mr-3" type="checkbox"></input>
        <>{ingredient.name}</>
      </li>
    </div>
  );
};

export default IngredientNode;
