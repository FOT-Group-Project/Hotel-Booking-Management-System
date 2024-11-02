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
import { FaSignOutAlt } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
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

export default function DashCheckOut() {
  const { currentUser } = useSelector((state) => state.user);
  const [bookedDetails, setBookedDetails] = useState([]);

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

  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(bookedDetails.length / itemsPerPage);

  const onPageChange = (page) => setCurrentPage(page);
  const currentData = bookedDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // Pagination

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const calculateDaysBetween = (date_in, date_out) => {
    const startDate = new Date(date_in);
    const endDate = new Date(date_out);

    const differenceInTime = endDate - startDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays;
  };

  const fetchBookedDetails = async () => {
    try {
      setFetchLoding(true);
      const res = await fetch(`/api/booked/checked-details`);
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
            <Breadcrumb.Item>Booking</Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="mt-3 mb-3 text-left font-semibold text-xl">
            All Booking Details
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
                      <TableHeadCell>contact no</TableHeadCell>
                      <TableHeadCell>room name</TableHeadCell>
                      <TableHeadCell>Check In Date</TableHeadCell>
                      <TableHeadCell>Check Out Date</TableHeadCell>
                      <TableHeadCell>No of Days</TableHeadCell>
                      <TableHeadCell>Total Price</TableHeadCell>
                      <TableHeadCell>Status</TableHeadCell>
                    </TableHead>
                    {currentData.map((bookedDetails) => (
                      <Table.Body className="divide-y" key={bookedDetails.id}>
                        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <TableCell>{bookedDetails.ref_no}</TableCell>
                          <TableCell>{bookedDetails.name}</TableCell>
                          <TableCell>{bookedDetails.contact_no}</TableCell>
                          <TableCell>{bookedDetails.room_name}</TableCell>
                          <TableCell>
                            {formatDate(bookedDetails.date_in)}
                          </TableCell>
                          <TableCell>
                            {formatDate(bookedDetails.date_out)}
                          </TableCell>
                          <TableCell>
                            {calculateDaysBetween(
                              bookedDetails.date_in,
                              bookedDetails.date_out
                            )}{" "}
                            days
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
                                Pending
                              </Badge>
                            )}
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
                <p>You have no users yet!</p>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
