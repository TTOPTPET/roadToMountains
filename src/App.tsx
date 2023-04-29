import "./App.css";
import dayjs from "dayjs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, ThemeProvider } from "@mui/material";

import { mainThemes } from "./config/MUI/themes/mainTheme/mainTheme";
// import Box from "@mui/materialBox";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {
  AdminPage,
  Authorization,
  CreatorLk,
  HomePage,
  NotificationsPage,
  PaymentSettingsPage,
  StatisticPage,
  TourCalendarPage,
  TouristLk,
  TourListPage,
  AddTourPage,
} from "./pages";
import NavTool from "./components/NavTool/NavTool";
import EditCreatorInfo from "./components/EditUserInfo/EditCreatorInfo/EditCreatorInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { UserType } from "./models/userModels/IUserInfo";
import EditTouristInfo from "./components/EditUserInfo/EditTouristInfo/EditTouristInfo";
import TourPage from "./pages/TourPage/TourPage";
import { useEffect } from "react";
import { getUserInfo } from "./submitFunctions/commonAPI";
import { setUserInfo } from "./redux/UserInfo/UserInfoReducer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  dayjs.locale("ru");
  const dispatch = useDispatch();
  useEffect(() => {
    getUserInfo(
      (value) => {
        dispatch(setUserInfo(value));
        // setLoadingStatus(false);
      },
      undefined,
      false
    );
  }, []);

  // const userType = "creator";
  return (
    <BrowserRouter>
      <ThemeProvider theme={mainThemes}>
        <Header />
        <Container>
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
              path={"/creator/editInfo"}
              element={
                <ProtectedRoute>
                  <EditCreatorInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/tourist/editInfo"}
              element={
                <ProtectedRoute>
                  <EditTouristInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/creator/lk/add"}
              element={
                <ProtectedRoute>
                  <AddTourPage isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/creator/lk/edit/:tourId"}
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
            <Route path={"/admin/*"} element={<AdminPage />} />
            <Route path={"/auth"} element={<Authorization />} />

            <Route path={"/tours/all"} element={<TourListPage />} />
            <Route path={"/tours/tour/:tourId"} element={<TourPage />} />
          </Routes>
        </Container>
        <Footer />
        {/* HACK:Инструмент навигации для разработки */}
        <NavTool />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
