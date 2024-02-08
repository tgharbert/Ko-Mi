import IngredientNode from "./IngredientNode";

type Ingredient = {
  name: string;
  ingredientId: number;
  checked: boolean;
};

const IngredientsList = async () => {
  // get the userIngredients from the db
  const getIngredients = async () => {
    try {
      const userIngredients: Response = await fetch(
        "http://localhost:3000/api/ingredients",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
      const ingredients = await userIngredients.json();
      return ingredients;
    } catch (error) {
      console.error(error);
      // should set an error message in the DOM
    }
  };

  const handleDeleteIngredients = async () => {
    try {
      await fetch("http://localhost:3000/api/ingredients", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getIngredients();
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  let ingredients = await getIngredients();

  return (
    <div>
      <div>
        {/* <div className="pb-8">
          <button className=" mr-4 bg-lime-500 px-3 rounded">
            Delete Checked
          </button>
          <button
            onClick={handleDeleteIngredients}
            className=" ml-4 bg-lime-500 px-3 rounded"
          >
            Delete All Items
          </button>
        </div> */}
        {/* SHOULD BE AN INFINITE SCROLL?? */}
        <div className="flex-col">
          <ul>
            {ingredients.map((ingredient: Ingredient) => {
              return (
                <IngredientNode
                  key={ingredient.ingredientId}
                  ingredient={ingredient}
                />
              );
            })}
          </ul>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default IngredientsList;
