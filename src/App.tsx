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

function App() {
  dayjs.locale("ru");
  return (
    <BrowserRouter>
      <ThemeProvider theme={mainThemes}>
        <Header />
        <Container disableGutters maxWidth={false} sx={{ width: "1024px" }}>
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/admin/*"} element={<AdminPage />} />
            <Route path={"/auth"} element={<Authorization />} />
            <Route path={"/creator/lk"} element={<CreatorLk />} />
            <Route path={"/creator/add"} element={<AddTourPage />} />
            <Route path={"/creator/notifications"} element={<NotificationsPage />} />
            <Route
              path={"/creator/payment"} // ???
              element={<PaymentSettingsPage />}
            />
            <Route path={"/creator/stats"} element={<StatisticPage />} />
            <Route path={"/creator/calendar"} element={<TourCalendarPage />} />
            <Route path={"/tourist/lk"} element={<TouristLk />} />
            <Route path={"/tours/all"} element={<TourListPage />} />
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
