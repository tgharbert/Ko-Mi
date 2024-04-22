import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function Loading() {
  return (
    <div className="flex justify-center items-center pt-10 lime-500">
      <Stack sx={{ color: "lime-500" }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    </div>
  );
}

export default Loading;
