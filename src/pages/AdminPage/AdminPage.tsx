import { ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { themes } from "../../config/MUI/themes/adminTheme/adminTheme";
import { AdminAuth } from "./AdminAuth/AdminAuth";
import { AdminPageProptected } from "./AdminPageProtected/AdminPageProtected";

function AdminPage() {
  return (
    <ThemeProvider theme={themes}>
      <Routes>
        <Route path={"auth"} element={<AdminAuth />} />
        <Route index element={<Navigate to={"access-tourist"} />} />
        <Route path={"*"} element={<AdminPageProptected />} />
      </Routes>
    </ThemeProvider>
  );
}

export default AdminPage;
