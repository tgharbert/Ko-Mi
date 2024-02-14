import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function YieldDropdown({
  recipeYield,
}: {
  recipeYield: number;
}) {
  // I want the values in the dropdown to be multiples or recipeValue-
  // .25, .5, 1, 1.5, 2

  // return (
  //   <Box sx={{ minWidth: 120 }}>
  //     <FormControl fullWidth>
  //       <InputLabel variant="standard" htmlFor="uncontrolled-native">
  //         Yield
  //       </InputLabel>
  //       <NativeSelect
  //         defaultValue={recipeYield}
  //         inputProps={{
  //           name: "age",
  //           id: "uncontrolled-native",
  //         }}
  //       >
  //         <option value={10}>Ten</option>
  //         <option value={20}>Twenty</option>
  //         <option value={30}>Thirty</option>
  //       </NativeSelect>
  //     </FormControl>
  //   </Box>
  // );

  return (
    <div>
      <select>
        <option value={recipeYield / 4}>{recipeYield / 4}</option>
        <option value={recipeYield / 2}>{recipeYield / 2}</option>
        <option value={recipeYield} selected>
          {recipeYield}
        </option>
        <option value={recipeYield * 1.5}>{recipeYield * 1.5}</option>
        <option value={recipeYield * 2}>{recipeYield * 2}</option>
      </select>
    </div>
  );
}
