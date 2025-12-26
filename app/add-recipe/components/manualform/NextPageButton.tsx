import Button from "@mui/material/Button";

function NextPageButton({ pageChange }: { pageChange: Function }) {
  return (
    <div>
      <Button
        variant="contained"
        className="px-4 bg-lime-500"
        onClick={() => pageChange()}
        color="lime"
      >
        Next Page
      </Button>
    </div>
  );
}

export default NextPageButton;
