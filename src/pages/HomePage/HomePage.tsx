import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 200,
        margin: "50px auto",
      }}
    >
      <Link to={"admin"}>AdminPage</Link>
      <Link to={"auth"}>Authorization</Link>
      <Link to={"creatorLk"}>CreatorLk</Link>
      <Link to={"myTours"}>CreatorTours</Link>
      <Link to={"notifications"}>NotificationsPage</Link>
      <Link to={"paymentSettings"}>PaymentSettingsPage</Link>
      <Link to={"statistics"}>StatisticPage</Link>
      <Link to={"tourCalendar"}>TourCalendarPage</Link>
      <Link to={"touristLk"}>TouristLk</Link>
      <Link to={"tourList"}>TourListPage</Link>
    </div>
  );
}

export default HomePage;
