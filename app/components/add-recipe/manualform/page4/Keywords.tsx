const Keywords = ({
  keywords,
  keywordsChange,
  keyword,
  addKeyword,
}: {
  keywords: string[];
  keywordsChange: Function;
  keyword: string;
  addKeyword: Function;
}) => {
  return (
    <div className="pb-4">
      {keywords.map((keyword: string, idx) => {
        return <p key={idx}>{keyword}</p>;
      })}
      <form onSubmit={(e) => addKeyword(e, keyword)}>
        <input
          type="text"
          value={keyword}
          placeholder="Enter Keyword..."
          onChange={(e) => keywordsChange(e)}
          className="text-black rounded px-4 pt-1 pb-1 mt-2"
          autoFocus
        ></input>
      </form>
    </div>
  );
};

export default Keywords;
