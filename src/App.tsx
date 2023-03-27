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
import ChangeCreatorInfo from "./pages/CreatorLk/ChangeCreatorInfoPage/ChangeCreatorInfo";
import NavTool from "./components/NavTool/NavTool";
import EditCreatorInfo from "./components/EditUserInfo/EditCreatorInfo/EditCreatorInfo";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { UserType } from "./models/userModels/IUserInfo";
import EditTouristInfo from "./components/EditUserInfo/EditTouristInfo/EditTouristInfo";

function App() {
  dayjs.locale("ru");
  const userType = useSelector(
    (state: RootState) => state.userInfo.userInfo.typeUser
  );
  return (
    <BrowserRouter>
      <ThemeProvider theme={mainThemes}>
        <Header />
        <Container disableGutters maxWidth={false} sx={{ width: "1024px" }}>
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/admin/*"} element={<AdminPage />} />
            <Route path={"/auth"} element={<Authorization />} />
            <Route path={"/creatorLk"} element={<CreatorLk />} />
            <Route
              path={"/editUserInfo"}
              element={
                userType === UserType.creator ? (
                  <EditCreatorInfo />
                ) : (
                  <EditTouristInfo />
                )
              }
            />
            <Route path={"/addTour"} element={<AddTourPage />} />
            <Route path={"/notifications"} element={<NotificationsPage />} />
            <Route
              path={"/paymentSettings"}
              element={<PaymentSettingsPage />}
            />
            <Route path={"/statistics"} element={<StatisticPage />} />
            <Route path={"/tourCalendar"} element={<TourCalendarPage />} />
            <Route path={"/touristLk"} element={<TouristLk />} />
            <Route path={"/tourList"} element={<TourListPage />} />
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
