import { Stack } from "@mui/material";
import { Routes, Route, Outlet } from "react-router-dom";
import {
  AdminHeader,
  AdminSideBar,
  AdminAccessTour,
  AdminAccessTourist,
  AdminConfirmAdmin,
  AdminMessages,
  AdminVerifyTouroperator,
} from "../../components/Admin";

function AdminPage() {
  return (
    <Stack direction={"column"} padding={2}>
      <AdminHeader />
      <Stack direction={"row"}>
        <AdminSideBar />
        <Outlet />
        <div className="admin-panels">
          <Routes>
            <Route path={"access-tourist"} element={<AdminAccessTourist />} />
            <Route path={"access-tour"} element={<AdminAccessTour />} />
            <Route
              path={"verify-touroperator"}
              element={<AdminVerifyTouroperator />}
            />
            <Route path={"messages"} element={<AdminMessages />} />
            <Route path={"confirm-admin"} element={<AdminConfirmAdmin />} />
          </Routes>
        </div>
      </Stack>
    </Stack>
  );
}

export default AdminPage;
