import { Alert, Breadcrumb, Button } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { React, useEffect, useState } from "react";
import { FaBed, FaUsers, FaDollarSign } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashOverView() {
  const [bookedDetails, setBookedDetails] = useState([]);
  const [fetchLoding, setFetchLoding] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Fetch booked details
  const fetchBookedDetails = async () => {
    try {
      setFetchLoding(true);
      const res = await fetch(`/api/booked/checked-details`);
      const data = await res.json();
      if (res.ok) {
        setBookedDetails(data.data);
      } else {
        setShowAlert(true);
        setAlertMessage(data.message);
        setTimeout(() => {
          setShowAlert(false);
          setAlertMessage("");
        }, 10000);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setFetchLoding(false);
    }
  };

  useEffect(() => {
    fetchBookedDetails();
  }, []);

  return (
    <div className="p-3 w-full">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Breadcrumb aria-label="Default breadcrumb example">
            <Link to="/dashboard?tab=dash">
              <Breadcrumb.Item href="" icon={HiHome}>
                Home
              </Breadcrumb.Item>
            </Link>
          </Breadcrumb>

          <h1 className="mt-3 mb-3 text-left font-semibold text-2xl ">
            Hotel Overview
          </h1>

          {showAlert && (
            <Alert color="failure" className="mb-4">
              {alertMessage}
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <FaBed className="text-blue-600 mr-2" />
                Rooms
              </h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold">Total Rooms</p>
                  <p className="text-gray-500">Available Rooms</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">20</p>
                  <p className="text-gray-500">10</p>
                </div>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <FaUsers className="text-green-600 mr-2" />
                Customers
              </h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold">Total Customers</p>
                  <p className="text-gray-500">Active Customers</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">20</p>
                  <p className="text-gray-500">10</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-100 p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <FaDollarSign className="text-purple-600 mr-2" />
                Revenue
              </h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold">Total Revenue</p>
                  <p className="text-gray-500">Monthly Revenue</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">$5,000</p>
                  <p className="text-gray-500">$1,500</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
