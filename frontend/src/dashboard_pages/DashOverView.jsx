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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4  w-full rounded-md shadow-lg">
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-gray-500 text-lg font-semibold ">
                    Check In
                  </h3>
                  <p className="text-2xl font-semibold">
                    Current Check In :{" "}
                    {overviewData ? overviewData.Total_Chcek_In : "Loading..."}
                  </p>
                </div>
                <FaSignInAlt className="bg-red-600 mt-4 text-white rounded-full text-5xl p-3 shadow-lg" />
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-red-500 font-semibold flex items-center ">
                  Avalibale Rooms :{" "}
                  {overviewData ? overviewData.Available_Rooms : "Loading..."}
                </span>
              </div>
            </div>

            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4  w-full rounded-md shadow-lg">
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-gray-500 text-lg font-semibold ">
                    Rooms
                  </h3>
                  <p className="text-2xl font-semibold">
                    Total Rooms :{" "}
                    {overviewData ? overviewData.Total_Rooms : "Loading..."}
                  </p>
                </div>
                <FaBed className="bg-blue-600 mt-4 text-white rounded-full text-5xl p-3 shadow-lg" />
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-blue-500 font-semibold flex items-center ">
                  Avalibale Rooms :{" "}
                  {overviewData ? overviewData.Available_Rooms : "Loading..."}
                </span>
              </div>
            </div>

            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4  w-full rounded-md shadow-lg">
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-gray-500 text-lg font-semibold ">
                    Customers
                  </h3>
                  <p className="text-2xl font-semibold">
                    Total Customers :{" "}
                    {overviewData ? overviewData.Total_Customers : "Loading..."}
                  </p>
                </div>
                <FaUsers className="bg-green-600 mt-4 text-white rounded-full text-5xl p-3 shadow-lg" />
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-green-500 font-semibold flex items-center ">
                  Active Customers :{" "}
                  {overviewData ? overviewData.Active_Customers : "Loading..."}
                </span>
              </div>
            </div>

            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4  w-full rounded-md shadow-lg">
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-gray-500 text-lg font-semibold ">
                    Revenue
                  </h3>
                  <p className="text-2xl font-semibold">
                    Rs.{" "}
                    {overviewData ? overviewData.Total_Revenue : "Loading..."}
                  </p>
                </div>
                <FaDollarSign className="bg-purple-600 mt-4 text-white rounded-full text-5xl p-3 shadow-lg" />
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-purple-500 font-semibold flex items-center ">
                  Monthly Revenue : Rs.{" "}
                  {overviewData ? overviewData.Monthly_Revenue : "Loading..."}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
