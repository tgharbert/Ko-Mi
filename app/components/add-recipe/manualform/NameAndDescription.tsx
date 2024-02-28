const NameAndDescription = ({
  nameChange,
  descriptionChange,
  name,
  description,
  pageChange,
}: {
  nameChange: Function;
  descriptionChange: Function;
  pageChange: Function;
  page: number;
  name: string;
  description: string;
}) => {
  return (
    <div className="px-8 justify-center flex">
      <form>
        <div className="pb-4">
          <p className="pb-4">Enter your recipe info:</p>
          <input
            className="text-black rounded px-4 pt-1 pb-1 "
            type="text"
            placeholder="Recipe Name"
            autoFocus
            value={name}
            onChange={(e) => nameChange(e)}
          />
        </div>
        <div className="pb-4">
          <textarea
            className="text-black rounded px-4 pt-1 pb-1 "
            placeholder="Recipe Description"
            value={description}
            onChange={(e) => descriptionChange(e)}
          />
        </div>
        <button onClick={pageChange}>Next Page</button>
      </form>
    </div>
  );
};

export default NameAndDescription;
