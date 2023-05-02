import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Layout from "./layouts/Layout";
import { GlobalStyle } from "./style/global_syle";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./muiTheme/MuiTheme";
import Dashboard from "./pages/DashBoard/Dashboard";
import Project from "./pages/Projects/Project";
import Reporting from "./pages/Reporting/Reporting";
import Employee from "./pages/Employee/Employee";
import Lms from "./pages/Lms/Lms";
import Notofication from "./pages/Notification/Notofication";
import Setting from "./pages/Settings/Setting";


function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <GlobalStyle/>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="Dashbord" Component={Layout}>
          <Route index Component={Dashboard} />
          <Route path="Project" Component={Project} />
          <Route path="Reporting" Component={Reporting} />
          <Route path="Employee" Component={Employee} />
          <Route path="Lms" Component={Lms} />
          <Route path="Notifications" Component={Notofication} />
          <Route path="Setting" Component={Setting} />
          <Route path="*" element={'NO PAGE'} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>

    </>
  );
}

export default App;
