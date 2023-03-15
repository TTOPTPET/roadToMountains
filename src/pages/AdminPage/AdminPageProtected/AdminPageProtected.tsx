import { Stack } from "@mui/material";
import { AdminHeader, AdminSideBar } from "../../../components/Admin";
import { Route, Routes } from "react-router-dom";
import { AdminAccessTouristPage } from "../AdminAccessTouristPage/AdminAccessTouristPage";
import { AdminAccessTourPage } from "../AdminAccessTourPage/AdminAccessTourPage";
import { AdminVerifyTouroperatorPage } from "../AdminVerifyTouroperatorPage/AdminVerifyTouroperatorPage";
import { AdminMessagesPage } from "../AdminMessagesPage/AdminMessagesPage";
import { AdminConfirmAdminPage } from "../AdminConfirmAdminPage/AdminConfirmAdminPage";

export const AdminPageProptected = () => {
  return (
    <Stack direction={"column"}>
      <AdminHeader />
      <Stack direction={"row"} height="100%">
        <AdminSideBar />
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
};
