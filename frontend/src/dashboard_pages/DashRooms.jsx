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

export default function DashRooms() {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    room_name: "",
    category_id: "",
    availability: "",
  });
  const [roomCategory, setRoomCategory] = useState([]);
  const [room, setRoom] = useState([]);
  const [createLoding, setCreateLoding] = useState(null);
  const [updateLoding, setUpdateLoding] = useState(null);
  const [fetchLoding, setFetchLoding] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showDeleteConfirmetion, setShowDeleteConfirmetion] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [editedCategory, setEditedCategory] = useState(null);

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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(room.length / itemsPerPage);

  const onPageChange = (page) => setCurrentPage(page);
  const currentData = room.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // Pagination

  useEffect(() => {
    fetchRoomCategory();
    fetchRoom();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleDrop = (files) => {
    if (files && files[0]) {
      const file = files[0];
      if (editedCategory) {
        setEditedCategory({ ...editedCategory, image: file });
        setEditImagePreview(URL.createObjectURL(file)); // Set image preview for edit modal
      } else {
        setFormData({ ...formData, image: file });
      }
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCreateLoding(true);

      // Send formData as JSON
      const res = await fetch(`/api/room/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_name: formData.room_name,
          category_id: formData.category_id,
          availability: formData.availability,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        fetchRoom(); // Refresh the list after creation
        setFormData({
          room_name: "",
          category_id: "",
          availability: "",
        }); // Clear the form after creation
        setCreateLoding(false);
      } else {
        setCreateLoding(false);
        setShowAlert(true);
        setAlertMessage(data.message);
        setTimeout(() => {
          setShowAlert(false);
          setAlertMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error.message);
      setCreateLoding(false);
    }
  };

  const deleteRoomHandler = async () => {
    if (!userIdToDelete) return; // Check if there's an ID to delete
    try {
      const res = await fetch(`/api/room/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        fetchRoom(); // Refresh the list after deletion
        setShowDeleteConfirmetion(false); // Close the modal
        setUserIdToDelete(null); // Clear the ID after deletion
      } else {
        setShowAlert(true);
        setAlertMessage(data.message);
        setTimeout(() => {
          setShowAlert(false);
          setAlertMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoding(true);

      const formData = new FormData();
      formData.append("room_name", editedCategory.room_name);
      formData.append("category_id", editedCategory.category_id);
      formData.append("availability", editedCategory.availability);

      if (editedCategory.image instanceof File) {
        formData.append("image", editedCategory.image);
      }

      const res = await fetch(`/api/room/update/${editedCategory.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        fetchRoom(); // Refresh the list after updating
        setOpenModalEdit(false); // Close the edit modal
        setEditedCategory(null); // Clear the edited category
        setImagePreview(null); // Clear image preview after editing
        setEditImagePreview(null); // Clear edit image preview on successful update
        setUpdateLoding(false);
      } else {
        setUpdateLoding(false);
        setShowAlert(true);
        setAlertMessage(data.message);
        setTimeout(() => {
          setShowAlert(false);
          setAlertMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error.message);
      setUpdateLoding(false);
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
            <Breadcrumb.Item>Rooms</Breadcrumb.Item>
          </Breadcrumb>

          <Modal
            show={showDeleteConfirmetion}
            onClose={() => setShowDeleteConfirmetion(false)}
            popup
            size="md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                  <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this user?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={deleteRoomHandler}>
                      Yes, I'm sure
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => setShowDeleteConfirmetion(false)}
                    >
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </motion.div>
          </Modal>

          <Modal
            show={openModalEdit}
            onClose={() => setOpenModalEdit(false)}
            popup
            size="md"
          >
            <Modal.Header />
            <Modal.Body>
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                <div>
                  <Label value="Room Name" />
                  <TextInput
                    id="room_name"
                    type="text"
                    required
                    shadow
                    onChange={(e) =>
                      setEditedCategory({
                        ...editedCategory,
                        room_name: e.target.value,
                      })
                    }
                    value={editedCategory?.room_name}
                  />
                </div>

                <div>
                  <Label value="Category" />
                  <Select
                    id="category_id"
                    required
                    shadow
                    onChange={(e) =>
                      setEditedCategory({
                        ...editedCategory,
                        category_id: e.target.value,
                      })
                    }
                    value={editedCategory?.category_id}
                  >
                    <option value="">Select Category</option>
                    {roomCategory.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label value="Availability" />
                  <Select
                    id="availability"
                    required
                    shadow
                    onChange={(e) =>
                      setEditedCategory({
                        ...editedCategory,
                        availability: e.target.value,
                      })
                    }
                    value={editedCategory?.availability}
                  >
                    <option value="">Select Availability</option>
                    <option value="1">Available</option>
                    <option value="0">Unavailable</option>
                  </Select>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    className="bg-customBlue"
                    type="submit"
                    disabled={updateLoding}
                  >
                    {updateLoding ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-3">Updating...</span>
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
            All Rooms
          </h1>

          <div className="flex p-3 flex-col md:flex-row gap-8 justify-between">
            {/* left side */}
            <div className="flex-[3]">
              <h1 className="mt-3 mb-3 text-left font-semibold text-xl">
                Room Form
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label value="Room Name" />
                  </div>
                  <TextInput
                    id="room_name"
                    type="text"
                    placeholder="RM-001"
                    required
                    shadow
                    onChange={handleChange}
                    value={formData.room_name}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label value="Category" />
                  </div>
                  <Select
                    id="category_id"
                    required
                    shadow
                    onChange={handleChange}
                    value={formData.category_id}
                  >
                    <option value="">Select Category</option>
                    {roomCategory.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label value="Availability" />
                  </div>
                  <Select
                    id="availability"
                    required
                    shadow
                    onChange={handleChange}
                    value={formData.availability}
                  >
                    <option value="">Select Availability</option>
                    <option value="1">Available</option>
                    <option value="0">Unavailable</option>
                  </Select>
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
                      "Create Room"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* right side */}
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
                          <TableHeadCell>room image</TableHeadCell>
                          <TableHeadCell>room</TableHeadCell>
                          <TableHeadCell>category</TableHeadCell>
                          <TableHeadCell>price</TableHeadCell>
                          <TableHeadCell>status</TableHeadCell>
                          <TableHeadCell>
                            <span className="sr-only">Edit</span>
                          </TableHeadCell>
                        </TableHead>
                        {currentData.map((room) => (
                          <Table.Body className="divide-y" key={room.id}>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <TableCell>
                                <div className="flex items-center gap-4">
                                  <div className="w-28 h-16 relative">
                                    <img
                                      src={`http://localhost:3001/uploads/${room.image}`}
                                      alt=""
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{room.room_name}</TableCell>
                              <TableCell>{room.category_name}</TableCell>
                              <TableCell>{room.price}</TableCell>
                              <TableCell>
                                {room.availability == 1 ? (
                                  <Badge color="success" size="sm">
                                    Available
                                  </Badge>
                                ) : (
                                  <Badge color="failure" size="sm">
                                    Unavailable
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <Button
                                  onClick={() => {
                                    setShowDeleteConfirmetion(true); // Open the modal
                                    setUserIdToDelete(room.id); // Set the ID of the category to delete
                                  }}
                                  color="gray"
                                  className="w-full mb-2"
                                >
                                  <MdDeleteForever className=" h-4 w-4" />
                                  Delete
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
                    <p>You have no users yet!</p>
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
