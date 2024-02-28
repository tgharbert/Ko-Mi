// the form will need the following fields:
// user is the author
// description
// name
// userId is the user's id
// instructions** -- seperate component
// keywords
// ingredients** -- seperate component
// image
// recipe yield
// total time
// cook time
// prep time
// category

const RecipeForm = () => {
  return (
    <div className="px-8 justify-center flex">
      <form>
        <div>
          <p>Im about to work on the form for the recipe</p>
          <input
            className="text-black rounded px-4 pt-1 pb-1 "
            type="text"
            placeholder="Recipe Name"
            autoFocus
          />
        </div>
        <div>
          <textarea
            className="text-black rounded px-4 pt-1 pb-1 "
            placeholder="Recipe Description"
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
