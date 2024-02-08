const RecipeSearchBar = () => {
  return (
    <div>
      <input
        className="text-black w-1/2 rounded px-2"
        type="text"
        placeholder="Enter Search Term"
      ></input>
      <button className="bg-lime-500 hover:bg-lime-600 rounded mx-3 px-3">
        Enter
      </button>
    </div>
  );
};

export default RecipeSearchBar;
