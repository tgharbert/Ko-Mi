import ModifyIngredients from "./ModifyIngredients";
import ModifyNameAndPhoto from "./ModifyNameAndPhoto";

const ModifyRecipeForm = async ({ recipe }: { recipe: Recipe }) => {
  return (
    <div>
      <ModifyNameAndPhoto recipe={recipe} />
      {/* INGREDIENTS */}
      <h3 className="text-lg">Ingredients:</h3>
      <div className="overflow-auto h-80">
        {/* I could reuse this component for the method, should be a scrollable div */}
        <ModifyIngredients ingredients={recipe.ingredients} />
      </div>
      {/* METHOD */}
    </div>
  );
};

export default ModifyRecipeForm;
