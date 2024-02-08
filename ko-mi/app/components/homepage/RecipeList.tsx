import RecipeCard from "./recipecard/RecipeCardHome";

const RecipeList = async () => {
  const fetchRecipes = async () => {
    const response = await fetch(`http://localhost:3000/api/get-recipes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  };

  let recipes = await fetchRecipes();

  return (
    <div className="">
      <div className="grid sm:grid-cols-3 gap-4 sm:content-around ">
        {recipes.map((recipe: any) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

export default RecipeList;
