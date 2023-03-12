import { Stack, ThemeProvider } from "@mui/material";
import { Routes, Route, Outlet } from "react-router-dom";
import { AdminHeader, AdminSideBar } from "../../components/Admin";
import { AdminAccessTourPage } from "./AdminAccessTourPage/AdminAccessTourPage";
import { AdminMessagesPage } from "./AdminMessagesPage/AdminMessagesPage";
import { AdminAccessTouristPage } from "./AdminAccessTouristPage/AdminAccessTouristPage";
import { AdminVerifyTouroperatorPage } from "./AdminVerifyTouroperatorPage/AdminVerifyTouroperatorPage";
import { AdminConfirmAdminPage } from "./AdminConfirmAdminPage/AdminConfirmAdminPage";
import { themes } from "../../config/MUI/themes/adminTheme/adminTheme";

function AdminPage() {
  return (
    <ThemeProvider theme={themes}>
      <Stack direction={"column"}>
        <AdminHeader />
        <Stack direction={"row"} height="100%">
          <AdminSideBar />
          <Outlet />
          <div className="admin-panels">
            <Routes>
              <Route
                path={"access-tourist"}
                element={<AdminAccessTouristPage />}
              />
              <Route path={"access-tour"} element={<AdminAccessTourPage />} />
              <Route
                path={"verify-touroperator"}
                element={<AdminVerifyTouroperatorPage />}
              />
              <Route path={"messages"} element={<AdminMessagesPage />} />
              <Route
                path={"confirm-admin"}
                element={<AdminConfirmAdminPage />}
              />
            </Routes>
          </div>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default AdminPage;
