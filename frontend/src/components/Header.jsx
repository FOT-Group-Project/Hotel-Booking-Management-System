import { Button, Navbar, TextInput, Dropdown, Avatar } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);

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
    <Navbar
      className="border-b-2 sticky top-0 z-50 justify-between"
      fluid
      rounded
    >
      <Link to="/">
        <img src={logo} alt="" className="w-48 " />
      </Link>

      <div className="flex gap-2 md:order-2">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilepicurl} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/">
              <Dropdown.Item>
                <span className="block text-sm">Home</span>
              </Dropdown.Item>
            </Link>

            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>
                <span className="block text-sm">Profile</span>
              </Dropdown.Item>
            </Link>

            <Link to="/dashboard?tab=dash">
              <Dropdown.Item>
                <span className="block text-sm">Dashboard</span>
              </Dropdown.Item>
            </Link>

            <Dropdown.Divider />
            <Link onClick={handleSignout}>
              <Dropdown.Item>
                <span className="block text-sm">Sign out</span>
              </Dropdown.Item>
            </Link>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button className="bg-customBlue">Sign In</Button>
          </Link>
        )}

        <Navbar.Toggle className="" />
      </div>

      <Navbar.Collapse className="mr-24">
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/booking"} as={"div"}>
          <Link to="/booking">Booking</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about-us"} as={"div"}>
          <Link to="/about-us">About Us</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/contact-us"} as={"div"}>
          <Link to="/contact-us">Contact Us</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
