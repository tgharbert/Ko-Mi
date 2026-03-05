import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function PhotoForm({
  handleFileSelected,
  fileName,
}: {
  handleFileSelected: Function;
  fileName: string;
}) {
  return (
    <div>
      <div className="mb-4">
        <p>Upload a Photo:</p>
        <label className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-tertiary px-4 py-2 rounded cursor-pointer">
          <CloudUploadIcon />
          Upload file
          <input
            type="file"
            className="sr-only"
            onChange={(e) => handleFileSelected(e)}
          />
        </label>
        {fileName !== "" ? (
          <p className="pb-2 pt-2">
            currently selected: <b>{fileName}</b>
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PhotoForm;
