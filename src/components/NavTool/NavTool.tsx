import { useState } from "react";
import { Link } from "react-router-dom";

function NavTool() {
  const [activeState, setActiveState] = useState<Boolean>();
  return (
    <div
      className="nav-tool"
      style={{
        width: "fit-content",
        position: "absolute",
        right: 0,
        bottom: 0,
        paddingRight: "10px",
        paddingBottom: "20px",
        overflow: "hidden",
      }}
    >
      <div
        className="nav-tool__btn"
        onClick={() => setActiveState((activeState) => !activeState)}
        style={{ cursor: "pointer", fontSize: "40px", textAlign: "end" }}
      >
        {activeState ? ">" : "<"}
      </div>
      <div
        className="nav-tool__panel"
        style={{
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          transform: `translateX(${activeState ? "0" : "150%"})`,
          transition: "all 0.2s",
        }}
      >
        <Link to={"/"}>HomePage</Link>
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
        <Link to={"addTour"}>AddTourPage</Link>
      </div>
    </div>
  );
}

export default NavTool;
