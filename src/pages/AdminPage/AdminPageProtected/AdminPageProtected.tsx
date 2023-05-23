import { Stack, Box, Typography } from "@mui/material";
import { AdminSideBar } from "../../../components/Admin";
import { Route, Routes } from "react-router-dom";
import { AdminAccessTouristPage } from "../AdminAccessTouristPage/AdminAccessTouristPage";
import { AdminAccessTourPage } from "../AdminAccessTourPage/AdminAccessTourPage";
import { AdminVerifyTouroperatorPage } from "../AdminVerifyTouroperatorPage/AdminVerifyTouroperatorPage";
import { AdminMessagesPage } from "../AdminMessagesPage/AdminMessagesPage";
import { AdminConfirmAdminPage } from "../AdminConfirmAdminPage/AdminConfirmAdminPage";

export const AdminPageProptected = () => {
  return (
    <Box>
      <Typography variant={"h4"}>Панель админа</Typography>
      <Stack direction={"row"} height="100%">
        <AdminSideBar />
        <Box className="admin-panels" ml={"350px"}>
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
        </Box>
      </Stack>
    </Box>
  );
};
