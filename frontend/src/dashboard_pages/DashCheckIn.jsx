import {
  Alert,
  Avatar,
  Breadcrumb,
  Button,
  Label,
  Modal,
  Pagination,
  Select,
  Spinner,
  Table,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
  FileInput,
  ButtonGroup,
  Badge,
} from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { React, useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { FaSignInAlt, FaSignOutAlt, FaWindowClose } from "react-icons/fa";
import "react-circular-progressbar/dist/styles.css";
import { FaUserEdit } from "react-icons/fa";
import {
  HiEye,
  HiEyeOff,
  HiHome,
  HiInformationCircle,
  HiOutlineExclamationCircle,
  HiPlusCircle,
} from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashCheckIn() {
  const { currentUser } = useSelector((state) => state.user);
  const [bookedDetails, setBookedDetails] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const [formData, setFormData] = useState({
    room_name: "",
    category_id: "",
    availability: "",
  });
  const [room, setRoom] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [createLoding, setCreateLoding] = useState(null);
  const [fetchLoding, setFetchLoding] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [bookedCheckOut, setBookedCheckOut] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(bookedDetails.length / itemsPerPage);

  const onPageChange = (page) => setCurrentPage(page);
  const currentData = bookedDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // Pagination

  const formatTodayDate = (date) => {
    if (!date) return "N/A"; // Return "N/A" or another placeholder if the date is invalid
    try {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date));
    } catch {
      return "Invalid Date";
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A"; // Return "N/A" or another placeholder if the date is invalid
    try {
      // Parse the date as UTC to avoid timezone issues
      const utcDate = new Date(
        Date.UTC(
          new Date(date).getUTCFullYear(),
          new Date(date).getUTCMonth(),
          new Date(date).getUTCDate()
        )
      );

      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(utcDate);
    } catch {
      return "Invalid Date";
    }
  };

  const formatTime = (date) => {
    if (!date) return "N/A"; // Return "N/A" if the date is invalid
    try {
      const utcDate = new Date(
        Date.UTC(
          new Date(date).getUTCFullYear(),
          new Date(date).getUTCMonth(),
          new Date(date).getUTCDate(),
          new Date(date).getUTCHours(),
          new Date(date).getUTCMinutes()
        )
      );

      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "UTC", // Ensure the time is consistent with UTC
      }).format(utcDate);
    } catch {
      return "Invalid Time";
    }
  };

  const calculateDaysBetween = (date_in, date_out) => {
    if (!date_in || !date_out) return "N/A";
    const startDate = new Date(date_in);
    const endDate = new Date(date_out);
    if (isNaN(startDate) || isNaN(endDate)) return "N/A";

    const differenceInTime = endDate - startDate;
    return (differenceInTime / (1000 * 3600 * 24)).toFixed(0);
  };

  const fetchBookedDetails = async () => {
    try {
      setFetchLoding(true);
      const res = await fetch(`/api/booking/get-pending-details`);
      const data = await res.json();
      if (res.ok) {
        setBookedDetails(data.data);
        setFetchLoding(false);
      } else {
        setFetchLoding(false);
        setShowAlert(true);
        setAlertMessage(data.message);
        setTimeout(() => {
          setShowAlert(false);
          setAlertMessage("");
        }, 10000);
      }
    } catch (error) {
      console.log(error.message);
      setFetchLoding(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateLoding(true);

    try {
      const res = await fetch(`/api/booked/checkin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ booking_id: selectedBookingId }),
      });
      const data = await res.json();
      if (res.ok) {
        setCreateLoding(false);
        setOpenModal(false);
        fetchBookedDetails();
        setShowAlert(true);
        setAlertMessage(data.message);
        setTimeout(() => {
          setShowAlert(false);
          setAlertMessage("");
        }, 10000);
      } else {
        setCreateLoding(false);
        setShowAlert(true);
        setAlertMessage(data.message);
        setTimeout(() => {
          setShowAlert(false);
          setAlertMessage("");
        }, 10000);
      }
    } catch (error) {
      console.log(error.message);
      setCreateLoding(false);
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
            <Breadcrumb.Item>Check In</Breadcrumb.Item>
          </Breadcrumb>

          <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Modal.Header>
                <h1 className="text-xl font-semibold">Check In Room</h1>
              </Modal.Header>

              <Modal.Body>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <Label value="Reference No : " />
                    {bookedCheckOut.reference_number}
                  </div>

                  <div>
                    <Label value="Name : " />
                    {bookedCheckOut.customer_name}
                  </div>

                  <div>
                    <Label value="Email : " />
                    {bookedCheckOut.customer_email}
                  </div>

                  <div>
                    <Label value="Contact No : " />
                    {bookedCheckOut.customer_phone}
                  </div>

                  <div>
                    <Label value="Room Name : " />
                    {bookedCheckOut.room_name}
                  </div>

                  <div>
                    <Label value="Check In Date : " />
                    {formatDate(bookedCheckOut.date_in)}
                  </div>

                  <div>
                    <Label value="Check Out Date : " />
                    {formatDate(bookedCheckOut.date_out)}
                  </div>

                  <div>
                    <Label value="No of Days : " />
                    {calculateDaysBetween(
                      bookedCheckOut.date_in,
                      bookedCheckOut.date_out
                    )}{" "}
                    days
                  </div>

                  <div>
                    <Label value="Total Price : " />
                    <b>Rs. {bookedCheckOut.total_price}</b>
                  </div>

                  <div className="flex gap-2">
                    <Label value="Status : " />

                    <div className="w-28">
                      {bookedCheckOut.status_description === "Checked Out" ? (
                        <Badge color="success" size="lg">
                          Checked Out
                        </Badge>
                      ) : bookedCheckOut.status_description === "Checked In" ? (
                        <Badge color="warning" size="lg">
                          Checked In
                        </Badge>
                      ) : bookedCheckOut.status_description === "Canceled" ? (
                        <Badge color="info" size="lg">
                          Canceled
                        </Badge>
                      ) : (
                        <Badge color="warning" size="lg">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button color="green" onClick={() => setOpenModal(false)}>
                      Close
                    </Button>
                    <Button
                      className="bg-indigo-800"
                      type="submit"
                      disabled={createLoding}
                    >
                      {createLoding ? (
                        <>
                          <Spinner size="sm" />
                          <span className="pl-3">Canceling...</span>
                        </>
                      ) : (
                        <>
                          <FaSignInAlt className="mr-2 mt-1" />

                          <span>Check In</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </motion.div>
          </Modal>

          <h1 className="mt-3 mb-3 text-left font-semibold text-xl">
            Check In Room
          </h1>

          {fetchLoding ? (
            <div className="flex justify-center items-center h-96">
              <Spinner size="xl" />
            </div>
          ) : (
            <>
              {currentUser.role == "admin" && currentData.length > 0 ? (
                <>
                  <Table hoverable className="shadow-md w-full">
                    <TableHead>
                      <TableHeadCell>Ref No</TableHeadCell>
                      <TableHeadCell>name</TableHeadCell>
                      <TableHeadCell>Email & Phone</TableHeadCell>
                      <TableHeadCell>room name</TableHeadCell>
                      <TableHeadCell>Check In Date</TableHeadCell>
                      <TableHeadCell>Check Out Date</TableHeadCell>
                      <TableHeadCell>Total Price</TableHeadCell>
                      <TableHeadCell>Status</TableHeadCell>
                      <TableHeadCell>
                        <span className="sr-only">Edit</span>
                      </TableHeadCell>
                    </TableHead>
                    {currentData.map((bookedDetails) => (
                      <Table.Body className="divide-y" key={bookedDetails.id}>
                        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <TableCell>
                            {bookedDetails.reference_number}
                          </TableCell>
                          <TableCell>{bookedDetails.customer_name}</TableCell>
                          <TableCell>
                            {bookedDetails.customer_email}
                            <br />
                            {bookedDetails.customer_phone}
                          </TableCell>
                          <TableCell>
                            {bookedDetails.room_name}
                            <br />
                            {bookedDetails.room_category_name}
                          </TableCell>
                          <TableCell>
                            {formatDate(bookedDetails.date_in)}
                            {<br />}
                            {"At : "}
                            {formatTime(bookedDetails.date_in)}
                          </TableCell>
                          <TableCell>
                            {formatDate(bookedDetails.date_out)}
                            {<br />}
                            {"At : "}
                            {formatTime(bookedDetails.date_out)}
                          </TableCell>

                          <TableCell>
                            <b>Rs. {bookedDetails.total_price}</b>
                          </TableCell>

                          <TableCell>
                            {bookedDetails.status_description ===
                            "Checked Out" ? (
                              <Badge color="success" size="lg">
                                Checked Out
                              </Badge>
                            ) : bookedDetails.status_description ===
                              "Checked In" ? (
                              <Badge color="warning" size="lg">
                                Checked In
                              </Badge>
                            ) : bookedDetails.status_description ===
                              "Canceled" ? (
                              <Badge color="info" size="lg">
                                Canceled
                              </Badge>
                            ) : (
                              <Badge color="warning" size="lg">
                                Pending{" "}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              layout="outline"
                              disabled={
                                formatDate(bookedDetails.date_in) >
                                formatTodayDate(new Date().toLocaleDateString())
                              }
                              onClick={() => {
                                setBookedCheckOut(bookedDetails);
                                setSelectedBookingId(bookedDetails.booking_id);
                                setOpenModal(true);
                              }}
                              className="bg-indigo-800"
                            >
                              <FaSignInAlt className="mr-2 mt-1" />
                              Check In
                            </Button>
                          </TableCell>
                        </TableRow>
                        {/* hr line */}
                        <TableRow>
                          <hr className="border-gray-200 dark:border-gray-700" />
                        </TableRow>
                      </Table.Body>
                    ))}
                  </Table>
                  {/* Pagination */}
                  <div className="flex overflow-x-auto sm:justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={onPageChange}
                      showIcons
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-96">
                  <HiInformationCircle className="text-4xl text-gray-400" />
                  <h1 className="text-xl font-semibold mt-3 text-gray-400">
                    No any booking to cancel
                  </h1>
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
