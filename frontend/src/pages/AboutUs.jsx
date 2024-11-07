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

export default function AboutUs() {
  const [fetchLoding, setFetchLoding] = useState(null);
  const [roomCategory, setRoomCategory] = useState([]);

  const fetchRoomCategory = async () => {
    try {
      setFetchLoding(true);
      const res = await fetch(`/api/roomcategory/getroomcategories`);
      const data = await res.json();
      if (res.ok) {
        setRoomCategory(data.roomcategories);
        setFetchLoding(false);
      }
    } catch (error) {
      console.log(error.message);
      setFetchLoding(false);
    }
  };

  useEffect(() => {
    fetchRoomCategory();
  }, []);

  const rooms = [];

  return (
    <div className=" w-full">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <section className="py-16 bg-gray-100" id="rooms">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-4">About Us</h2>
              <p className="text-center text-lg text-gray-600 mb-12">
                We are a hotel that is located in the heart of the city. We
                offer the best services at affordable prices. We have a team of
                professionals who are always ready to help you with anything you
                need. We have a wide range of rooms to choose from, so you can
                find the perfect one for your stay. We also have a restaurant
                that serves delicious food, and a bar where you can relax and
                enjoy a drink. We look forward to welcoming you to our hotel!
              </p>
            </div>

            <div className="container mx-auto px-4 ">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-32">
                <div>
                  <img src={image1} alt="" className="rounded-lg" width={500} />
                </div>
                <div className="hidden md:block">
                  <img src={image2} alt="" className="rounded-lg" width={500} />
                </div>
                <div className="hidden md:block">
                  <img src={image3} alt="" className="rounded-lg" width={500} />
                </div>
              </div>
            </div>
          </section>

          <section className="py-16" id="rooms">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-4">Our Rooms</h2>
              <p className="text-center text-lg text-gray-600 mb-12">
                We have a wide range of rooms to choose from, so you can find
                the perfect one for your stay. All of our rooms are spacious and
                comfortable, and are equipped with everything you need for a
                relaxing stay. We also have a team of professionals who are
                always ready to help you with anything you need. We look forward
                to welcoming you to our hotel!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {roomCategory.map((room) => (
                  <Card
                    className="max-w-sm mb-5"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc={`http://localhost:3001/uploads/${room.image}`}
                  >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {room.category_name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      <span>{room.description}</span>
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-100" id="rooms">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-4">
                Our Services
              </h2>
              <p className="text-center text-lg text-gray-600 mb-12">
                We offer a wide range of services to make your stay as
                comfortable and enjoyable as possible. Our team of professionals
                is always ready to help you with anything you need. We have a
                restaurant that serves delicious food, a bar where you can relax
                and enjoy a drink, and a spa where you can pamper yourself. We
                also offer room service, laundry service, and free Wi-Fi. We
                look forward to welcoming you to our hotel!
              </p>

              <div className="flex gap-4">
                <Card
                  className="max-w-sm mb-5"
                  imgAlt="Meaningful alt text for an image that is not purely decorative"
                >
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Restaurant
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span>
                      Our restaurant serves delicious food that is made with
                      fresh and locally sourced ingredients. We offer a wide
                      range of dishes to choose from, so you can find the
                      perfect one for your taste. We also have a team of
                      professional chefs who are dedicated to providing you with
                    </span>
                  </p>
                </Card>

                <Card
                  className="max-w-sm mb-5"
                  imgAlt="Meaningful alt text for an image that is not purely decorative"
                >
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Bar
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span>
                      Our bar is the perfect place to relax and enjoy a drink
                      after a long day. We offer a wide range of drinks to
                      choose from, including cocktails, beers, and wines. We
                      also have a team of friendly bartenders who are always
                      ready to serve you. We look forward to welcoming you to
                      our bar!
                    </span>
                  </p>
                </Card>

                <Card
                  className="max-w-sm mb-5"
                  imgAlt="Meaningful alt text for an image that is not purely decorative"
                >
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Spa
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span>
                      Our spa is the perfect place to pamper yourself and relax.
                      We offer a wide range of treatments to choose from,
                      including massages, facials, and body scrubs. We also have
                      a team of professional therapists who are dedicated to
                      providing you with the best service possible. We look
                      forward to welcoming you to our spa!
                    </span>
                  </p>
                </Card>

                <Card
                  className="max-w-sm mb-5"
                  imgAlt="Meaningful alt text for an image that is not purely decorative"
                >
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Room Service
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span>
                      We offer room service so you can enjoy a delicious meal in
                      the comfort of your room. We have a wide range of dishes
                      to choose from, so you can find the perfect one for your
                      taste. We also offer a selection of drinks and snacks. We
                      look forward to serving you!
                    </span>
                  </p>
                </Card>
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
