import IngredientNode from "./IngredientNode";

export default function IngredientList({
  ingredients,
}: {
  ingredients: IngredientWithLocation[];
}) {
  return (
    <div className="flex-col">
      <ul>
        {ingredients.map((ingredient: IngredientWithLocation) => {
          return <IngredientNode key={ingredient.id} ingredient={ingredient} />;
        })}
      </ul>
    </div>
  );
}
