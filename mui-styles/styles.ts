import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    lime: Palette["primary"];
  }

  interface PaletteOptions {
    lime?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    lime: true;
  }
}

const theme = createTheme({
  palette: {
    lime: {
      main: "#84CC16",
      light: "#65A30D",
      dark: "#65A30D",
      contrastText: "#F7F9F9",
    },
  },
});

export default theme;