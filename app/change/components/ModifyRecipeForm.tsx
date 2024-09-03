import ModifyIngredients from "./ModifyIngredients";

const ModifyRecipeForm = async ({ recipe }: { recipe: Recipe }) => {
  return (
    <form>
      <h1 className="text-xl font-semibold mb-2">{recipe.name}</h1>
      {/* need to figure out the onchange */}
      <div className="pb-4">
        <h3 className="text-lg">Name:</h3>
        <input
          className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-96"
          type="text"
          defaultValue={`${recipe.name}`}
        />
      </div>

      {/* INGREDIENTS */}
      <h3 className="text-lg">Ingredients:</h3>
      <div className="overflow-auto h-80">
        {/* I could reuse this component for the method, should be a scrollable div */}
        <ModifyIngredients ingredients={recipe.ingredients} />
      </div>
      {/* METHOD */}
      {/* PHOTO */}
    </form>
  );
};

export default ModifyRecipeForm;
