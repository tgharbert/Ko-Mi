import IngredientNode from "./IngredientNode";

export default function IngredientList({
  ingredients,
}: {
  ingredients: IngredientWithLocation[];
}) {
  return (
    <div className="flex-col -mt-4">
      <ul>
        {ingredients.map((ingredient: IngredientWithLocation) => {
          return <IngredientNode key={ingredient.id} ingredient={ingredient} />;
        })}
      </ul>
    </div>
  );
}
