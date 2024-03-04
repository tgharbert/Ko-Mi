import Keywords from "./Keywords";

const KeywordsAndPhoto = ({
  keywords,
  keywordChange,
  keyword,
  addKeyword,
}: {
  keywords: string[];
  keywordChange: Function;
  keyword: string;
  addKeyword: Function;
}) => {
  return (
    <div>
      <Keywords
        keywords={keywords}
        keywordsChange={keywordChange}
        keyword={keyword}
        addKeyword={addKeyword}
      />
    </div>
  );
};

export default KeywordsAndPhoto;
