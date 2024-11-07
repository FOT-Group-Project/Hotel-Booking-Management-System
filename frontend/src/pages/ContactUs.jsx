import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Carousel, Footer, Card } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsMailbox,
  BsPhone,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/logo.png";
import image1 from "../assets/heroSlider/1.jpg";
import image2 from "../assets/heroSlider/2.jpg";
import image3 from "../assets/heroSlider/3.jpg";
import room1 from "../assets/rooms/1-lg.png";

export default function ContactUs() {
  return (
    <div className=" w-full">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <section className="bg-gray-100 py-16" id="hero">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                  <p className="text-lg text-gray-600 mb-4">
                    If you have any questions or need help with anything, please
                    feel free to contact us. Our team is always ready to help
                    you with anything you need. You can reach us by phone,
                    email, or social media. We look forward to hearing from you!
                  </p>

                  <Button
                    className="bg-customBlue w-1/4"
                    as={Link}
                    to="/contact"
                  >
                    Contact Us
                  </Button>
                </div>
                <img src={image1} alt="" className="rounded-lg shadow-md" />
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-100" id="rooms">
            <div className="container mx-auto px-4">
              <p className="text-center text-lg text-gray-600 mb-12">
                If you have any questions or need help with anything, please
                feel free to contact us. Our team is always ready to help you
                with anything you need. You can reach us by phone, email, or
                social media. We look forward to hearing from you!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">
                    Contact Information
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <BsPhone className="inline-block mr-2" />
                    Phone: +1 234 567 890
                  </p>
                  <p className="text-gray-600 mb-2">
                    <BsMailbox className="inline-block mr-2" />
                    Email: salford@co.com
                    <a
                      href="mailto:salford@co.com"
                      className="text-blue-500 hover:underline"
                    ></a>
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                  <div className="flex items-center space-x-4">
                    <BsFacebook className="text-2xl text-blue-500 hover:text-blue-700" />
                    <BsTwitter className="text-2xl text-blue-500 hover:text-blue-700" />
                    <BsInstagram className="text-2xl text-blue-500 hover:text-blue-700" />
                    <BsYoutube className="text-2xl text-blue-500 hover:text-blue-700" />
                    <BsGithub className="text-2xl text-blue-500 hover:text-blue-700" />
                    <BsDribbble className="text-2xl text-blue-500 hover:text-blue-700" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer container>
            <div className="w-full">
              <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                <div>
                  <Link to="/">
                    <img src={logo} alt="" className="w-48 " />
                  </Link>

                  <div className="w-96">
                    <p className="text-gray-600 mt-4 ">
                      Salford & Co.™ is a luxury hotel that provides the
                      ultimate comfort and relaxation, with every detail
                      designed for your ultimate relaxation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                  <div>
                    <Footer.Title title="services" />
                    <Footer.LinkGroup col>
                      <Footer.Link href="">Booking</Footer.Link>
                      <ScrollLink to="rooms" smooth={true} duration={1000}>
                        <Footer.Link href="#">Rooms</Footer.Link>
                      </ScrollLink>
                    </Footer.LinkGroup>
                  </div>
                  <div>
                    <Footer.Title title="Follow us" />
                    <Footer.LinkGroup col>
                      <Footer.Link href="#">Facebook</Footer.Link>
                      <Footer.Link href="#">Instagram</Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div>
                    <Footer.Title title="Legal" />
                    <Footer.LinkGroup col>
                      <Footer.Link href="#">Privacy Policy</Footer.Link>
                      <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                </div>
              </div>
              <Footer.Divider />
              <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href="#" by="Salford & Co.™" year={2024} />
                <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                  <Footer.Icon href="#" icon={BsFacebook} />
                  <Footer.Icon href="#" icon={BsInstagram} />
                  <Footer.Icon href="#" icon={BsTwitter} />
                  <Footer.Icon href="#" icon={BsYoutube} />
                </div>
              </div>
            </div>
          </Footer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
