import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { FaUsers, FaPowerOff } from "react-icons/fa";
import { RiHotelFill } from "react-icons/ri";
import { FaBed } from "react-icons/fa6";

import { FaSignInAlt, FaWindowClose, FaSignOutAlt } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosMan } from "react-icons/io";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=dash">
            <Sidebar.Item
              active={tab === "dash" || !tab}
              icon={HiChartPie}
              as="div"
            >
              Dashboard
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=booked">
            <Sidebar.Item
              active={tab === "booked" || !tab}
              icon={FaBed}
              as="div"
            >
              Booked
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=check-in">
            <Sidebar.Item
              active={tab === "check-in" || !tab}
              icon={FaSignInAlt}
              as="div"
            >
              Check In
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=check-out">
            <Sidebar.Item
              active={tab === "check-out" || !tab}
              icon={FaSignOutAlt}
              as="div"
            >
              Check Out
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=booking-cancel">
            <Sidebar.Item
              active={tab === "booking-cancel" || !tab}
              icon={FaWindowClose}
              as="div"
            >
              Booking Cancel
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=customers">
            <Sidebar.Item active={tab === "customers"} icon={IoIosMan} as="div">
              Customers
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=rooms">
            <Sidebar.Item
              active={tab === "rooms" || !tab}
              icon={MdBedroomParent}
              as="div"
            >
              Rooms
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=room-category">
            <Sidebar.Item
              active={tab === "room-category" || !tab}
              icon={BiSolidCategory}
              as="div"
            >
              Room Category
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=users">
            <Sidebar.Item active={tab === "users"} icon={FaUsers} as="div">
              Users
            </Sidebar.Item>
          </Link>

          <Sidebar.Item
            icon={FaPowerOff}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
