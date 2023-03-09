import "./App.css";
import dayjs from "dayjs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
} from "./pages";
import NavTool from "./components/NavTool/NavTool";

function App() {
  dayjs.locale("ru");
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/admin"} element={<AdminPage />} />
          <Route path={"/auth"} element={<Authorization />} />
          <Route path={"/creatorLk"} element={<CreatorLk />} />
          <Route path={"/notifications"} element={<NotificationsPage />} />
          <Route path={"/paymentSettings"} element={<PaymentSettingsPage />} />
          <Route path={"/statistics"} element={<StatisticPage />} />
          <Route path={"/tourCalendar"} element={<TourCalendarPage />} />
          <Route path={"/touristLk"} element={<TouristLk />} />
          <Route path={"/tourList"} element={<TourListPage />} />
        </Routes>
      </main>
      <Footer />
      {/* HACK:Инструмент навигации для разработки */}
      <NavTool />
    </BrowserRouter>
  );
}

export default App;
