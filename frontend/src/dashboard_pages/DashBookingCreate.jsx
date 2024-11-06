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
  Badge,
} from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { React, useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
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

export default function DashBookingCreate() {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    category_name: "",
    price: "",
    description: "",
    image: null,
  });

  const [customer, setCustomer] = useState([]);
  const [room, setRoom] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([]);

  const [roomCategory, setRoomCategory] = useState([]);
  const [createLoding, setCreateLoding] = useState(null);
  const [updateLoding, setUpdateLoding] = useState(null);
  const [fetchLoding, setFetchLoding] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showDeleteConfirmetion, setShowDeleteConfirmetion] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [image, setImage] = useState(null);

  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [editedCategory, setEditedCategory] = useState(null);

  const fetchCustomer = async () => {
    try {
      setFetchLoding(true);
      const res = await fetch(`/api/customer/getcustomers`);
      const data = await res.json();
      if (res.ok) {
        setCustomer(data.customers);
        setFetchLoding(false);
      }
    } catch (error) {
      console.log(error.message);
      setFetchLoding(false);
    }
  };

  const fetchRoom = async () => {
    try {
      setFetchLoding(true);
      const res = await fetch(`/api/room/getroom-all-details`);
      const data = await res.json();
      if (res.ok) {
        setRoom(data.rooms);
        setFetchLoding(false);
      }
    } catch (error) {
      console.log(error.message);
      setFetchLoding(false);
    }
  };

  const fetchBookingDetails = async () => {
    try {
      setFetchLoding(true);
      const res = await fetch(`/api/booking/get-all-details`);
      const data = await res.json();
      if (res.ok) {
        setBookingDetails(data.data);
        setFetchLoding(false);
      }
    } catch (error) {
      console.log(error.message);
      setFetchLoding(false);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(date));
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(bookingDetails.length / itemsPerPage);

  const onPageChange = (page) => setCurrentPage(page);
  const currentData = bookingDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // Pagination

  useEffect(() => {
    fetchCustomer();
    fetchRoom();
    fetchBookingDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateLoding(true);
    try {
      const res = await fetch(`/api/booking/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setCreateLoding(false);
        setFormData({});
        fetchBookingDetails();
        setShowAlert(false);
        setAlertMessage("");
        fetchCustomer();
        fetchRoom();
      } else {
        setCreateLoding(false);
        setShowAlert(true);
        setAlertMessage(data.message);
      }
    } catch (error) {
      console.log(error.message);
      setCreateLoding(false);
    }
  };

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
            <Breadcrumb.Item>Room Booking Create</Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="mt-3 mb-3 text-left font-semibold text-xl">
            New Booking
          </h1>

          <div className="flex p-3 flex-col md:flex-row gap-8 justify-between">
            {/* Left Side */}
            <div className="flex-[2] ">
              <h1 className="mt-3 mb-3 text-left font-semibold text-xl">
                Room Booking Form
              </h1>
              {showAlert && (
                <Alert
                  className="mb-3"
                  color="failure"
                  icon={HiInformationCircle}
                >
                  <span className="font-medium">Info alert!</span>{" "}
                  {alertMessage}
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <div className="mb-2 block">
                    <Label value="Select a customers" />
                  </div>
                  <Select
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        customer_id: e.target.value,
                      });
                    }}
                    placeholder="Select a customer"
                  >
                    <option value="">Select a customer</option>
                    {customer.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} {" - "} {customer.email}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label value="Select a Room" />
                  </div>
                  <Select
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        room_id: e.target.value,
                      });
                    }}
                    placeholder="Select a Room"
                  >
                    <option value="">Select a Room</option>
                    {room.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.room_name} {" - "} {room.category_name}{" "}
                        {" - Rs. "}
                        {room.price} {" - "} {room.status.toUpperCase()}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label value="Check In Date & Time" />
                  <TextInput
                    id="check_in"
                    type="datetime-local"
                    required
                    shadow
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        check_in: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <Label value="Check Out Date & Time" />
                  <TextInput
                    id="check_out"
                    type="datetime-local"
                    required
                    shadow
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        check_out: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    className="bg-customBlue"
                    type="submit"
                    disabled={createLoding}
                  >
                    {createLoding ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-3">Loading...</span>
                      </>
                    ) : (
                      "Create Booking"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Right Side */}
            <div className="flex-[6] ">
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
                          <TableHeadCell>Room Details</TableHeadCell>
                          <TableHeadCell>Customer Name</TableHeadCell>
                          <TableHeadCell>Check In Date</TableHeadCell>
                          <TableHeadCell>Check Out Date</TableHeadCell>
                          <TableHeadCell>Price</TableHeadCell>

                          <TableHeadCell>Status</TableHeadCell>
                        </TableHead>
                        {currentData.map((bookingDetails) => (
                          <Table.Body
                            className="divide-y"
                            key={bookingDetails.id}
                          >
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <TableCell>
                                {bookingDetails.reference_number}
                              </TableCell>
                              <TableCell>
                                {bookingDetails.room_name}
                                <br />
                                {bookingDetails.room_category_name}
                              </TableCell>
                              <TableCell>
                                {bookingDetails.customer_name}
                              </TableCell>
                              <TableCell>
                                {formatDate(bookingDetails.date_in)}
                                <br />
                                {"At : "}
                                {formatTime(bookingDetails.date_in)}
                              </TableCell>
                              <TableCell>
                                {formatDate(bookingDetails.date_out)}
                                <br />
                                {"At : "}
                                {formatTime(bookingDetails.date_out)}
                              </TableCell>
                              <TableCell>
                                <b>Rs. {bookingDetails.total_price}</b>
                              </TableCell>
                              <TableCell>
                                {bookingDetails.booking_status ===
                                "confirmed" ? (
                                  <Badge color="success" size="lg">
                                    Confirmed
                                  </Badge>
                                ) : bookingDetails.booking_status ===
                                  "cancelled" ? (
                                  <Badge color="warning" size="lg">
                                    Cancelled
                                  </Badge>
                                ) : (
                                  <Badge color="info" size="lg">
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
                    <div className="flex justify-center items-center h-96">
                      <p className="text-center text-gray-500 dark:text-gray-400">
                        No booking found
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
