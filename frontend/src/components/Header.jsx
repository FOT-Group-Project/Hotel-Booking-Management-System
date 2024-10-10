import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import logo from "../assets/logo.png";

export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
  return (
    <Navbar className="border-b-2">
      <Link to="/">
        <img src={logo} alt="" className="w-48" />
      </Link>

      <div className="flex gap-2 md:order-2">
        <Link to="/sign-in">
          <Button className="bg-customBlue">Sign In</Button>
        </Link>
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
