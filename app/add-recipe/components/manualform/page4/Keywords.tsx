import AddIcon from "@mui/icons-material/Add";

function Keywords({
  keywords,
  keywordsChange,
  keyword,
  addKeyword,
}: {
  keywords: string[];
  keywordsChange: Function;
  keyword: string;
  addKeyword: Function;
}) {
  return (
    <div className="pb-4">
      {keywords.map((keyword: string, idx: number) => {
        return <p key={idx}>#{keyword}</p>;
      })}
      <form onSubmit={(e) => addKeyword(e, keyword)}>
        <input
          type="text"
          value={keyword}
          placeholder="Enter Keyword..."
          onChange={(e) => keywordsChange(e)}
          className="text-black rounded-lg px-4 pt-1 pb-1 mt-2 border-2 border-primary w-full sm:w-2/5"
          autoFocus
        ></input>
        <div className="mt-2 items-center">
          <button>
            <label>Add Keyword:</label>
            <AddIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Keywords;
