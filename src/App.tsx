import "./App.css";
import dayjs from "dayjs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
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
      <Header />
      <Container disableGutters maxWidth={false} sx={{ width: "1024px" }}>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/admin/*"} element={<AdminPage />} />
          <Route path={"/auth"} element={<Authorization />} />
          <Route path={"/creatorLk"} element={<CreatorLk />} />
          <Route path={"/addTour"} element={<AddTourPage />} />
          <Route path={"/notifications"} element={<NotificationsPage />} />
          <Route path={"/paymentSettings"} element={<PaymentSettingsPage />} />
          <Route path={"/statistics"} element={<StatisticPage />} />
          <Route path={"/tourCalendar"} element={<TourCalendarPage />} />
          <Route path={"/touristLk"} element={<TouristLk />} />
          <Route path={"/tourList"} element={<TourListPage />} />
        </Routes>
      </Container>
      <Footer />
      {/* HACK:Инструмент навигации для разработки */}
      <NavTool />
    </BrowserRouter>
  );
}

export default App;
