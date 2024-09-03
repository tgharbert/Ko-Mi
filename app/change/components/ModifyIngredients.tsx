const ModifyIngredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <div>
      {ingredients.map((ingredient: Ingredient) => (
        <div className="pb-4" key={ingredient.id}>
          <textarea
            className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-96"
            defaultValue={`${ingredient.name}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ModifyIngredients;
