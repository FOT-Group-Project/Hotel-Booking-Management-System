import React from "react";
import { Button, Carousel } from "flowbite-react";

export default function Home() {
  return (
    <div className=" mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8">
        {/* left side */}
        <div className="flex-1">
          <Carousel>
            <img src="https://via.placeholder.com/800x400" alt="" />
            <img src="https://via.placeholder.com/800x400" alt="" />
            <img src="https://via.placeholder.com/800x400" alt="" />
          </Carousel>
        </div>
        {/* right side */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Welcome to Salford & Co</h1>
          <p className="text-sm mt-5">
            <b>Salford & Co</b> is a luxury business hotel, offering top-tier
            comfort, modern amenities, and tailored services for the busy
            professional. Experience effortless stays designed for success.
          </p>
          <Button className="mt-5">Book a room</Button>
        </div>
      </div>

      <div className="h-56 sm:h-64 xl:h-100">
        <Carousel slideInterval={5000}>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
      </div>
    </div>
  );
}
