import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../dashboard_pages/DashProfile";
import DashUsers from "../dashboard_pages/DashUser";
import DashCustomers from "../dashboard_pages/DashCustomers";
import DashRooms from "../dashboard_pages/DashRooms";
import DashRoomCategorys from "../dashboard_pages/DashRoomCategorys";
import DashCheckIn from "../dashboard_pages/DashCheckIn";
import DashCheckOut from "../dashboard_pages/DashCheckOut";

export default function Dashboard() {
  const loaction = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(loaction.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [loaction.search]);

  return (
    <div className=" flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === "profile" && <DashProfile />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* customers */}
      {tab === "customers" && <DashCustomers />}
      {/* rooms */}
      {tab === "rooms" && <DashRooms />}
      {/* room categorys */}
      {tab === "room-category" && <DashRoomCategorys />}
      {/* check in */}
      {tab === "check-in" && <DashCheckIn />}
      {/* check out */}
      {tab === "check-out" && <DashCheckOut />}
    </div>
  );
}
