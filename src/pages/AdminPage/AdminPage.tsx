import { Stack } from "@mui/material";
import { Routes, Route, Outlet } from "react-router-dom";
import { AdminHeader, AdminSideBar } from "../../components/Admin";
import { AdminAccessTourPage } from "./AdminAccessTourPage/AdminAccessTourPage";
import { AdminMessagesPage } from "./AdminMessagesPage/AdminMessagesPage";
import { AdminAccessTouristPage } from "./AdminAccessTouristPage/AdminAccessTouristPage";
import { AdminVerifyTouroperatorPage } from "./AdminVerifyTouroperatorPage/AdminVerifyTouroperatorPage";
import { AdminConfirmAdminPage } from "./AdminConfirmAdminPage/AdminConfirmAdminPage";

function AdminPage() {
  return (
    <Stack direction={"column"} padding={2}>
      <AdminHeader />
      <Stack direction={"row"}>
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
            <Route path={"confirm-admin"} element={<AdminConfirmAdminPage />} />
          </Routes>
        </div>
      </Stack>
    </Stack>
  );
}

export default AdminPage;
