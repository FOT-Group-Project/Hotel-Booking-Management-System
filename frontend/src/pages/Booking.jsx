import React, { useEffect, useState } from "react";
import { Button, Carousel, Footer, Card, Spinner } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
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

export default function Booking() {
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
    <div className="relative">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
    
          {/* Rooms section */}
          <section className="py-16 bg-gray-100" id="rooms">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-4">
                Rooms & Suites
              </h2>
              <p className="text-center text-lg text-gray-600 mb-12">
                Our luxurious rooms and suites are designed to provide the
                ultimate comfort and relaxation, with every detail carefully
                considered to ensure a truly unforgettable stay.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {fetchLoding ? (
                  <div className="flex justify-center items-center h-96">
                    <Spinner size="xl" />
                  </div>
                ) : (
                  <>
                    {roomCategory.map((room) => (
                      <Card
                        key={room.id}
                        imgSrc={`http://localhost:3001/uploads/${room.image}`}
                        className="overflow-hidden shadow-lg rounded-lg "
                        // image with 600px and high 400px
                      >
                        <h3 className="text-2xl font-semibold mb-2">
                          {room.category_name}
                        </h3>
                        <p className="text-gray-600 mb-1">{room.description}</p>
                        <div className="flex items-center justify-between text-gray-600 text-lg mb-2">
                          <span>
                            <b>Rs {room.price}.00</b>{" "}
                          </span>
                        </div>
                        <Button className="bg-customBlue">
                          Check Availability
                        </Button>
                      </Card>
                    ))}
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-customBlue text-white py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
                <div>
                  <h2 className="text-4xl font-bold mb-4">
                    Book Your Stay Now
                  </h2>
                  <p className="text-lg mb-6">
                    Experience the height of luxury with our exclusive rooms and
                    suites, designed to provide the ultimate comfort and
                    relaxation.
                  </p>

                  {/* Phone number */}
                  <div className="flex items-center mb-4">
                    <BsPhone className="text-2xl mr-4" />
                    <span className="text-lg">+1 (123) 456-7890</span>
                  </div>

                  {/* Email */}

                  <div className="flex items-center mb-4">
                    <BsMailbox className="text-2xl mr-4" />
                    <span className="text-lg">
                      <a href="mailto:" className="text-white">
                        info@salford.com
                      </a>
                    </span>
                  </div>

                  <Button className="bg-white text-customBlue mt-10">
                    Book Now
                  </Button>
                </div>
                <div className="hidden md:block">
                  <img src={image1} alt="" className="rounded-lg" width={500} />
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
