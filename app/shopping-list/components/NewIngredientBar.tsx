function AddListItemBar({
  handleSubmit,
  setValue,
  item,
}: {
  handleSubmit: Function;
  setValue: Function;
  item: string;
}) {
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} action={handleSubmit()}>
        <input
          className="text-black w-1/2 rounded px-4 pt-1 pb-1 "
          type="text"
          value={item}
          onChange={(e) => setValue(e)}
          placeholder="Item to add..."
          autoFocus
        />
        <button className="bg-secondary hover:bg-lime-600 rounded ml-2 px-2 pt-1 pb-1">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddListItemBar;
