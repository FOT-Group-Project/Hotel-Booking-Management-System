import React from "react";
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

export default function Home() {
  const rooms = [
    {
      id: 1,
      name: "Deluxe Room",
      size: "50M²",
      maxPeople: 3,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      price: "$265",
      image: "room1", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Luxury Room",
      size: "50M²",
      maxPeople: 4,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      price: "$289",
      image: "https://via.placeholder.com/400", // Replace with actual image URL
    },
    {
      id: 3,
      name: "Luxury Suite Room",
      size: "90M²",
      maxPeople: 5,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      price: "$320",
      image: "https://via.placeholder.com/400", // Replace with actual image URL
    },

    {
      id: 1,
      name: "Deluxe Room",
      size: "50M²",
      maxPeople: 3,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      price: "$265",
      image: "https://via.placeholder.com/400", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Luxury Room",
      size: "50M²",
      maxPeople: 4,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      price: "$289",
      image: "https://via.placeholder.com/400", // Replace with actual image URL
    },
    {
      id: 3,
      name: "Luxury Suite Room",
      size: "90M²",
      maxPeople: 5,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      price: "$320",
      image: "https://via.placeholder.com/400", // Replace with actual image URL
    },
  ];
  return (
    <div className="relative">
      {/* Hero Section with Image Carousel */}
      <div className="w-full h-screen ">
        <Carousel slide={true} indicators={false}>
          <div
            className="w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${image1})` }}
          >
            <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">
                  Experience the Height of Luxury
                </h1>
                <p className="text-lg mb-6">
                  Indulge in unparalleled comfort and world-class service, where
                  every detail is designed for your ultimate relaxation.
                </p>
                <center>
                  <ScrollLink to="rooms" smooth={true} duration={1000}>
                    {" "}
                    {/* Smooth scrolling link */}
                    <Button className="bg-customBlue" size="lg">
                      See Our Rooms
                    </Button>
                  </ScrollLink>
                </center>
              </div>
            </div>
          </div>
          <div
            className="w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${image2})` }}
          >
            <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">
                  Your Sanctuary Awaits
                </h1>
                <p className="text-lg mb-6">
                  Escape to elegance and serenity in our exclusive rooms and
                  suites, crafted to provide an unforgettable stay.
                </p>
                <center>
                  <ScrollLink to="rooms" smooth={true} duration={1000}>
                    {" "}
                    {/* Smooth scrolling link */}
                    <Button className="bg-customBlue" size="lg">
                      See Our Rooms
                    </Button>
                  </ScrollLink>
                </center>
              </div>
            </div>
          </div>
          <div
            className="w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${image3})` }}
          >
            <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">
                  Unwind in Pure Luxury
                </h1>
                <p className="text-lg mb-6">
                  Pamper yourself with lavish accommodations, gourmet dining,
                  and spa treatments tailored for ultimate rejuvenation.
                </p>
                <center>
                  <ScrollLink to="rooms" smooth={true} duration={1000}>
                    {" "}
                    {/* Smooth scrolling link */}
                    <Button className="bg-customBlue" size="lg">
                      See Our Rooms
                    </Button>
                  </ScrollLink>
                </center>
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Rooms section */}
      <section className="py-16 bg-gray-100" id="rooms">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Rooms & Suites
          </h2>
          <p className="text-center text-lg text-gray-600 mb-12">
            Our luxurious rooms and suites are designed to provide the ultimate
            comfort and relaxation, with every detail carefully considered to
            ensure a truly unforgettable stay.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <Card
                key={room.id}
                imgSrc={room1}
                className="overflow-hidden shadow-lg rounded-lg "
                // image with 600px and high 400px
              >
                <div className="flex items-center justify-between text-gray-600 text-sm mb-2">
                  <span>Size: {room.size}</span>
                  <span>Max People: {room.maxPeople}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <Button className="bg-customBlue">
                  Book Now from {room.price}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-customBlue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            <div>
              <h2 className="text-4xl font-bold mb-4">Book Your Stay Now</h2>
              <p className="text-lg mb-6">
                Experience the height of luxury with our exclusive rooms and
                suites, designed to provide the ultimate comfort and relaxation.
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

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Testimonials</h2>
          <p className="text-center text-lg text-gray-600 mb-12">
            Our guests love us! Here's what they have to say about their stay at
            Salford & Co.™
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-100 p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp"
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-sm text-gray-600">Guest</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "Staying at Salford & Co. was an unforgettable experience! The
                service was exceptional, and the ambiance felt like home."
              </p>
              <div className="flex items-center">
                <BsDribbble className="text-2xl text-customBlue" />
                <BsFacebook className="text-2xl text-customBlue ml-2" />
                <BsTwitter className="text-2xl text-customBlue ml-2" />
              </div>
            </Card>
            <Card className="bg-gray-100 p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://instasize.com/_next/image?url=%2FV169WnBir5QwcI5uGBAp%2Fs%2Fcbb07b87f77d89afe79fe9efea8a900ea91a22fc89e9e91334c4ed3b54621cdc&w=640&q=75"
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Jane Doe</h3>
                  <p className="text-sm text-gray-600">Guest</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "The rooms were stunning and the staff went above and beyond. I
                can't wait to return!"
              </p>
              <div className="flex items-center">
                <BsDribbble className="text-2xl text-customBlue" />
                <BsFacebook className="text-2xl text-customBlue ml-2" />
                <BsTwitter className="text-2xl text-customBlue ml-2" />
              </div>
            </Card>
            <Card className="bg-gray-100 p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://img.freepik.com/free-photo/front-view-smiley-business-man_23-2148479583.jpg?semt=ais_hybrid"
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Alex Smith</h3>
                  <p className="text-sm text-gray-600">Guest</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "Fantastic experience! The location is perfect and the amenities
                are top-notch."
              </p>
              <div className="flex items-center">
                <BsDribbble className="text-2xl text-customBlue" />
                <BsFacebook className="text-2xl text-customBlue ml-2" />
                <BsTwitter className="text-2xl text-customBlue ml-2" />
              </div>
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
                  Salford & Co.™ is a luxury hotel that provides the ultimate
                  comfort and relaxation, with every detail designed for your
                  ultimate relaxation.
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
    </div>
  );
}
