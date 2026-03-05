import Accordion from "@/app/components/Accordion";

type Ingredient = {
  id: number;
  name: string;
  locationId: number;
  recipeId: number;
  types: string[];
};

function IngredientAccordion({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <Accordion title="Recipe Ingredients">
      <ul className="list-disc text-left ml-2">
        {ingredients.map((ingredient, idx) => (
          <li className="pb-4" key={idx}>
            {ingredient.name}
          </li>
        ))}
      </ul>
    </Accordion>
  );
}

export default IngredientAccordion;
