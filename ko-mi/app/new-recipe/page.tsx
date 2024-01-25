import getData from "../add-recipe/scraper";

const NewRecipe = ({ searchParams }) => {
  // this is logging the URL
  console.log("here: ", searchParams.search);

  const url = searchParams.search;

  const getRecipeData = async (url: string) => {
    const data = await getData(url);
    // console.log(data);
  };
  // do all of the work here...
  // then let the user verify the recipe data and send to DB

  const recipe = getRecipeData(searchParams.search);

  return (
    <div>
      <h1>New Recipe</h1>
    </div>
  );
};

export default NewRecipe;
