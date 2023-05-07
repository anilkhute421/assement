import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { GlobalStyle } from "./style/global_syle";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./muiTheme/MuiTheme";
import Project from "./pages/Projects/Project";
import Employee from "./pages/Employee/Employee";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <GlobalStyle/>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" Component={Layout}>
          <Route index Component={Employee} />
          <Route path="view-user" Component={Project} />
          <Route path="*" element={'NO PAGE'} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>

    </>
  );
}

export default App;
