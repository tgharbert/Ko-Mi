import Button from "@mui/material/Button";

function BackPageButton({ revertPage }: { revertPage: Function }) {
  return (
    <div>
      <Button
        variant="contained"
        className="px-4 bg-lime-500"
        onClick={() => revertPage()}
        color="lime"
      >
        Previous
      </Button>
    </div>
  );
}

export default BackPageButton;
