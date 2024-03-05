import Keywords from "./Keywords";
import PhotoForm from "./PhotoForm";

const KeywordsAndPhoto = ({
  keywords,
  keywordChange,
  keyword,
  addKeyword,
  handleSubmitPhoto,
  handleFileSelected,
}: {
  keywords: string[];
  keywordChange: Function;
  keyword: string;
  addKeyword: Function;
  handleSubmitPhoto: Function;
  handleFileSelected: Function;
}) => {
  return (
    <div>
      <Keywords
        keywords={keywords}
        keywordsChange={keywordChange}
        keyword={keyword}
        addKeyword={addKeyword}
      />
      <PhotoForm
        handleSubmitPhoto={handleSubmitPhoto}
        handleFileSelected={handleFileSelected}
      />
    </div>
  );
};

export default KeywordsAndPhoto;
