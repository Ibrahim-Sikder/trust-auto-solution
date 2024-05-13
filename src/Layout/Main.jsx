import { ThemeProvider } from "@mui/material";
import {  Outlet } from "react-router-dom";
import { theme } from "../Theme";

const Main = () => {

  return (
    <main >
     <ThemeProvider theme={theme}>
     <Outlet />
     </ThemeProvider>
    </main>
  );
};

export default Main;