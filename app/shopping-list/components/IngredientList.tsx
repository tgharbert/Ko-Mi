import IngredientNode from "./IngredientNode";

export default function IngredientList({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  return (
    <div className="flex-col">
      <ul>
        {ingredients.map((ingredient: Ingredient) => {
          return <IngredientNode key={ingredient.id} ingredient={ingredient} />;
        })}
      </ul>
    </div>
  );
}
