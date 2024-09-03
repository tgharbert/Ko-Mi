const ModifyIngredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
  async function modifyIngredients(formData: FormData) {
    "use server";
    // right now it's typed to 'any' because I'm having issues with fractions...
    let rawFormData: any = [];
    for (let i = 0; i < ingredients.length; i++) {
      rawFormData.push(formData.get(ingredients[i].name));
    }
    console.log(rawFormData);
  }

  return (
    <div className="overflow-auto">
      <form action={modifyIngredients}>
        {ingredients.map((ingredient: Ingredient) => (
          <div className="pb-4" key={ingredient.id}>
            <textarea
              name={ingredient.name}
              className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-96"
              defaultValue={`${ingredient.name}`}
            />
          </div>
        ))}
        <button className="ml-2 pt-1 pb-1 text-bold text-lg bg-secondary hover:bg-lime-600 rounded-lg px-4 text-white">
          {" "}
          Update Ingredients
        </button>
      </form>
    </div>
  );
};

export default ModifyIngredients;
