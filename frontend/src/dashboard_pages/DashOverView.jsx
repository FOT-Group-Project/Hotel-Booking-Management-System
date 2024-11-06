import { Alert, Breadcrumb } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { React, useEffect, useState } from "react";
import { FaBed, FaUsers, FaDollarSign } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaWindowClose } from "react-icons/fa";

export default function DashOverView() {
  const [fetchData, setFetchData] = useState(null); // Changed to null initially
  const [fetchLoading, setFetchLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Fetch details
  const fetchOverViewDetails = async () => {
    setFetchLoading(true);
    try {
      const response = await fetch("/api/details/details-overview");
      const data = await response.json();

      if (data.success) {
        setFetchData(data.data); // Set the data directly
      } else {
        setAlertMessage(
          data.error || "An error occurred while fetching details."
        );
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("An error occurred while fetching details.");
      setShowAlert(true);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    fetchOverViewDetails();
  }, []);

  // Ensure that fetchData has a valid structure before rendering
  const overviewData = fetchData && fetchData.length > 0 ? fetchData[0] : null;

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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-red-100 p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <FaSignInAlt className="text-red-600 mr-2" />
                Rooms
              </h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold">Total Check In</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">
                    {overviewData ? overviewData.Total_Chcek_In : "Loading..."}
                  </p>
                </div>
              </div>
            </div>

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
                  <p className="text-xl font-semibold">
                    {overviewData ? overviewData.Total_Rooms : "Loading..."}
                  </p>
                  <p className="text-gray-500">
                    {overviewData ? overviewData.Available_Rooms : "Loading..."}
                  </p>
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
                  <p className="text-xl font-semibold">
                    {overviewData ? overviewData.Total_Customers : "Loading..."}
                  </p>
                  <p className="text-gray-500">
                    {overviewData
                      ? overviewData.Active_Customers
                      : "Loading..."}
                  </p>
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
                  <p className="text-xl font-semibold">
                    Rs.{" "}
                    {overviewData ? overviewData.Total_Revenue : "Loading..."}
                  </p>
                  <p className="text-gray-500">
                    Rs.{" "}
                    {overviewData ? overviewData.Monthly_Revenue : "Loading..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
