import "./App.css";
import dayjs from "dayjs";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Container, ThemeProvider, Box } from "@mui/material";

import { mainThemes } from "./config/MUI/themes/mainTheme/mainTheme";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {
  AdminPage,
  Authorization,
  CreatorLk,
  NotificationsPage,
  PaymentSettingsPage,
  StatisticPage,
  TourCalendarPage,
  TouristLk,
  TourListPage,
  AddTourPage,
  StartPage,
  EditCreatorInfoPage,
  EditTouristInfoPage,
} from "./pages";

import { useDispatch } from "react-redux";
import TourPage from "./pages/TourPage/TourPage";
import { useEffect } from "react";
import { getUserInfo } from "./API/commonAPI";
import { setUserInfo } from "./redux/UserInfo/UserInfoReducer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NavTool from "./components/NavTool/NavTool";
import { BAN_STATUS, REFRESH_TOKEN, TOKEN, USER_ROLE } from "./config/types";
import { useCookies } from "react-cookie";
import HelpButton from "./components/HelpButton/HelpButton";
import ErrorReportModal from "./components/Modals/ErrorReportModal/ErrorReportModal";
import SuccessMessageSendModal from "./components/Modals/SuccessMessageSendModal/SuccessMessageSendModal";

function App() {
  const [cookies] = useCookies([TOKEN, REFRESH_TOKEN, BAN_STATUS, USER_ROLE]);

  dayjs.locale("ru");
  const dispatch = useDispatch();
  useEffect(() => {
    cookies.TOKEN &&
      getUserInfo((value) => {
        dispatch(setUserInfo(value));
        // setLoadingStatus(false);
      });
  }, [cookies]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={mainThemes}>
        <Header />

        <Container sx={{ p: "95px 0 70px 0" }}>
          <Routes>
            <Route
              path={"/creator/lk"}
              element={
                <ProtectedRoute>
                  <CreatorLk />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/creator/lk/editInfo"}
              element={
                <ProtectedRoute>
                  <EditCreatorInfoPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/tourist/lk/editInfo"}
              element={
                <ProtectedRoute>
                  <EditTouristInfoPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/creator/addTour"}
              element={
                <ProtectedRoute>
                  <AddTourPage isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/creator/editTour/:tourId"}
              element={
                <ProtectedRoute>
                  <AddTourPage isEditing />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/creator/notifications"}
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/creator/payment"}
              element={
                <ProtectedRoute>
                  <PaymentSettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/creator/stats"}
              element={
                <ProtectedRoute>
                  <StatisticPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/creator/calendar"}
              element={
                <ProtectedRoute>
                  <TourCalendarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/tourist/lk"}
              element={
                <ProtectedRoute>
                  <TouristLk />
                </ProtectedRoute>
              }
            />
            <Route path={"/"} element={<StartPage />} />
            <Route path={"/admin/*"} element={<AdminPage />} />
            <Route path={"/auth"} element={<Authorization />} />
            <Route path={"/tours/all"} element={<TourListPage />} />
            <Route path={"/tours/tour/:tourId"} element={<TourPage />} />
          </Routes>
        </Container>
        <Box sx={{ position: "fixed", bottom: "50px", left: "50px" }}>
          <HelpButton />
        </Box>
        <Footer />
        {/* HACK:Инструмент навигации для разработки */}
        <NavTool />
        <ErrorReportModal />
        <SuccessMessageSendModal />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
