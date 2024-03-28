import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1586FD",
    },
    secondary: {
      main: "#42A1DA",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          padding: "3px 5px",
        },
      },
    },
   
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
//   typography:{
//     body1:{
//       color: '#fff',
//     }
//   }
});

// theme.shadows[1] = '0px 5px 22px lightgray'