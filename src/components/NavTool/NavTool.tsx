import { useState } from "react";
import { Link } from "react-router-dom";

function NavTool() {
  const [activeState, setActiveState] = useState<Boolean>();
  return (
    <div
      className="nav-tool"
      style={{
        width: "fit-content",
        position: "fixed",
        left: 0,
        bottom: 0,
        paddingRight: "10px",
        paddingBottom: "20px",
        overflow: "hidden",
      }}
    >
      <div
        className="nav-tool__btn"
        onClick={() => setActiveState((activeState) => !activeState)}
        style={{ cursor: "pointer", fontSize: "40px", textAlign: "start" }}
      >
        {activeState ? "<" : ">"}
      </div>
      <div
        className="nav-tool__panel"
        style={{
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          transform: `translateX(${activeState ? "-150%" : "5%"})`,
          transition: "all 0.2s",
        }}
      >
        <Link to={"/"}>HomePage</Link>
        <Link to={"/admin"}>AdminPage</Link>
        <Link to={"/auth"}>Authorization</Link>
        <Link to={"/creator/lk"}>CreatorLk</Link>
        {/*<Link to={""}>CreatorTours</Link>-->*/}
        <Link to={"/creator/notifications"}>NotificationsPage</Link>
        <Link to={"/creator/payment"}>PaymentSettingsPage</Link>
        <Link to={"/creator/stats"}>StatisticPage</Link>
        <Link to={"/creator/calendar"}>TourCalendarPage</Link>
        <Link to={"/tourist/lk"}>TouristLk</Link>
        <Link to={"/tours/all"}>TourListPage</Link>
        <Link to={"/creator/lk/add"}>AddTourPage</Link>
      </div>
    </div>
  );
}

export default NavTool;
