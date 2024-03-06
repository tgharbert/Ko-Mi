import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const PhotoForm = ({
  handleFileSelected,
  fileName,
}: {
  handleFileSelected: Function;
  fileName: string;
}) => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div>
      <div className="mb-4">
        <p>Upload a Photo:</p>
        <Button
          component="label"
          role={undefined}
          onChange={(e) => handleFileSelected(e)}
          className="px-4"
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
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
};

export default PhotoForm;
