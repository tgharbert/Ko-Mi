const PhotoForm = ({
  handleSubmitPhoto,
  handleFileSelected,
}: {
  handleSubmitPhoto: Function;
  handleFileSelected: Function;
}) => {
  return (
    <div>
      <input
        type="file"
        name="image"
        onChange={(e) => handleFileSelected(e)}
        className="file-input-neutral file-input file-input-bordered file-input-sm w-full max-w-xs hover:file-input-secondary"
      />
      <button
        className="btn mt-1 bg-primary px-1 text-white"
        onClick={() => handleSubmitPhoto()}
      >
        Submit Photo
      </button>
    </div>
  );
};

export default PhotoForm;
