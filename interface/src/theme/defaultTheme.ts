import { createTheme } from "@mui/material";

const colors = {
  primary: "#81BB27",
  secondary: "#605D61",
  white: "#FFFFFF",
};

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },

    text: {
      primary: colors.secondary,
    },

    error: {
      main: "#C6151B",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          "&.Mui-disabled": {
            backgroundColor: "#8C8A8D",
          },
        },
        contained: {
          color: "#ffffff",
        },
      },
    },

    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
        },
      },
    },
  },
});
