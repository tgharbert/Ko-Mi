import Keywords from "./Keywords";
import PhotoForm from "./PhotoForm";

function KeywordsAndPhoto({
  keywords,
  keywordChange,
  keyword,
  addKeyword,
  handleFileSelected,
  fileName,
}: {
  keywords: string[];
  keywordChange: Function;
  keyword: string;
  addKeyword: Function;
  handleFileSelected: Function;
  fileName: string;
}) {
  return (
    <div>
      <Keywords
        keywords={keywords}
        keywordsChange={keywordChange}
        keyword={keyword}
        addKeyword={addKeyword}
      />
      <PhotoForm handleFileSelected={handleFileSelected} fileName={fileName} />
    </div>
  );
}

export default KeywordsAndPhoto;
