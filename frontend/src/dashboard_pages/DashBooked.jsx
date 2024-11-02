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

export default function DashBooked() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCreateLoding(true);

      // Prepare the data to be sent
      const requestData = {
        ref_no: formData.ref_no, // Getting reference number from formData
        room_id: formData.id, // Getting the selected room ID
        name: formData.name, // Getting the customer name
        contact_no: formData.contact_no, // Getting the contact number
        date_in: formData.check_in_date, // Use date as is (assumed to be 'YYYY-MM-DD')
        date_out: formData.check_out_date, // Use date as is (assumed to be 'YYYY-MM-DD')
        booked_cid: currentUser.id, // Assuming `currentUser.id` is the customer ID
      };

      const res = await fetch(`/api/booked/checkin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (res.ok) {
        fetchRoom(); // Refresh the list after creation
        setFormData({
          room_name: "",
          category_id: "",
          availability: "",
          name: "",
          contact_no: "",
          check_in_date: "",
          check_out_date: "",
        }); // Clear the form after creation
        setCreateLoding(false);
        setOpenModal(false); // Close the modal after success
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

          <Modal
            show={openModal}
            onClose={() => setOpenModal(false)}
            popup
            size="lg"
          >
            <Modal.Header />
            <Modal.Body>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold">Check In Room</h1>

                {showAlert && (
                  <Alert color="failure" className="flex items-center">
                    <div className="flex">
                      <HiOutlineExclamationCircle className="w-6 h-6 mr-4" />
                      {alertMessage}
                    </div>
                  </Alert>
                )}
                <div>
                  <Label value="Room Name : " />
                  {formData.room_name} {" - "} {formData.category_name}
                </div>

                <div>
                  <Label value="Customer Name" />
                  <TextInput
                    id="name"
                    type="text"
                    required
                    shadow
                    onChange={(e) => handleChange(e)}
                    placeholder="Kasun Perera"
                  />
                </div>

                <div>
                  <Label value="Contact No" />
                  <TextInput
                    id="contact_no"
                    type="number"
                    required
                    shadow
                    onChange={(e) => handleChange(e)}
                    placeholder="0712345678"
                  />
                </div>

                <div>
                  <Label value="Check In Date" />
                  <TextInput
                    id="check_in_date"
                    type="date"
                    required
                    shadow
                    onChange={(e) => {
                      const formattedDate = e.target.value; // This will be in 'YYYY-MM-DD'
                      setFormData({
                        ...formData,
                        check_in_date: formattedDate,
                      });
                    }}
                  />
                </div>

                <div>
                  <Label value="Check Out Date" />
                  <TextInput
                    id="check_out_date"
                    type="date"
                    required
                    shadow
                    onChange={(e) => {
                      const formattedDate = e.target.value; // This will be in 'YYYY-MM-DD'
                      setFormData({
                        ...formData,
                        check_out_date: formattedDate,
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
                        <span className="pl-3">Checking...</span>
                      </>
                    ) : (
                      "Update Room Category"
                    )}
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>

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

                          {/* <TableCell>
                            <Button
                              onClick={() => {
                                setOpenModal(true);
                                // set all the data to the form
                                setFormData({
                                  id: room.id,
                                  room_name: room.room_name,
                                  category_id: room.category_id,
                                  category_name: room.category_name,
                                  availability: room.availability,
                                });
                              }}
                              className="w-full mb-2  bg-customBlue"
                              disabled={
                                room.status === "occupied" ||
                                room.status === "unavailable"
                              }
                            >
                              <FaSignInAlt className="h-5 w-4 mr-2" />
                              Check In
                            </Button>
                          </TableCell> */}
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
