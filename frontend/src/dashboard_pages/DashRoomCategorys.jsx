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

export default function DashRoomCategorys() {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    category_name: "",
    price: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [roomCategory, setRoomCategory] = useState([]);
  const [createLoding, setCreateLoding] = useState(null);
  const [fetchLoding, setFetchLoding] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showDeleteConfirmetion, setShowDeleteConfirmetion] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(roomCategory.length / itemsPerPage);

  const onPageChange = (page) => setCurrentPage(page);
  const currentData = roomCategory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // Pagination

  useEffect(() => {
    fetchRoomCategory();
  }, []);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "dropzone-file" && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [id]: value });
    }

    console.log(formData); // Log the current formData state
  };

  const handleDrop = (files) => {
    if (files && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0])); // Generate preview URL
    }
  };

  const handleClearImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCreateLoding(true);

      const formDataToSend = new FormData();
      formDataToSend.append("category_name", formData.category_name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);

      const res = await fetch("/api/roomcategory/createroomcategory", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await res.json();
      if (res.ok) {
        fetchRoomCategory();
        setFormData({
          category_name: "",
          price: "",
          description: "",
          image: null,
        });
        setImagePreview(null);
      } else {
        setFormData({
          category_name: "",
          price: "",
          description: "",
          image: null,
        });
        setShowAlert(true);
        setAlertMessage(data.message);
        setTimeout(() => {
          setShowAlert(false);
          setAlertMessage("");
        }, 5000);
      }
      setCreateLoding(false);
    } catch (error) {
      console.log(error.message);
      setCreateLoding(false);
    }
  };

  const deleteRoomCategoryHandler = async () => {
    if (!userIdToDelete) return; // Check if there's an ID to delete
    try {
      const res = await fetch(
        `/api/roomcategory/deleteroomcategory/${userIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        fetchRoomCategory(); // Refresh the list after deletion
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
            <Breadcrumb.Item>Room Category</Breadcrumb.Item>
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
                    <Button color="failure" onClick={deleteRoomCategoryHandler}>
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

          <h1 className="mt-3 mb-3 text-left font-semibold text-xl">
            All Category
          </h1>

          <div className="flex p-3 flex-col md:flex-row gap-8 justify-between">
            {/* left side */}
            <div className="flex-[3]">
              <h1 className="mt-3 mb-3 text-left font-semibold text-xl">
                Room Category Form
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
                    <Label value="Room Category Name" />
                  </div>
                  <TextInput
                    id="category_name"
                    type="text"
                    placeholder="Single Room"
                    required
                    shadow
                    onChange={handleChange}
                    value={formData.category_name}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label value="Price" />
                  </div>
                  <TextInput
                    id="price"
                    type="number"
                    placeholder="1000"
                    required
                    shadow
                    onChange={handleChange}
                    value={formData.price}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label value="Description" />
                  </div>
                  <TextInput
                    id="description"
                    type="text"
                    placeholder="This is a single room"
                    required
                    shadow
                    onChange={handleChange}
                    value={formData.description}
                  />
                </div>

                <div>
                  <Label value="Room Image" />
                  {imagePreview ? (
                    <div className="relative mt-4">
                      <img
                        src={imagePreview}
                        alt="Selected Room Preview"
                        className="h-40 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={handleClearImage}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full shadow hover:bg-red-800"
                      >
                        Clear Image
                      </button>
                    </div>
                  ) : (
                    <div className="flex w-full items-center justify-center">
                      <Label
                        htmlFor="dropzone-file"
                        className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDrop(e.dataTransfer.files);
                        }}
                      >
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG or JPG (MAX. 800x400px)
                          </p>
                        </div>
                        <FileInput
                          id="dropzone-file"
                          className="hidden"
                          onChange={handleChange}
                          accept="image/png, image/jpeg"
                        />
                      </Label>
                    </div>
                  )}
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
                      "Create Room Category"
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
                          <TableHeadCell>Room Image</TableHeadCell>
                          <TableHeadCell style={{ width: "200px" }}>
                            Room
                          </TableHeadCell>
                          <TableHeadCell>description</TableHeadCell>

                          <TableHeadCell>
                            <span className="sr-only">Edit</span>
                          </TableHeadCell>
                        </TableHead>
                        {currentData.map((roomCategory) => (
                          <Table.Body
                            className="divide-y"
                            key={roomCategory.id}
                          >
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <TableCell>
                                <div className="flex items-center gap-4">
                                  <div className="w-32 h-20 relative">
                                    <img
                                      src={`http://localhost:3001/uploads/${roomCategory.image}`}
                                      alt=""
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <b>Name : </b>
                                {roomCategory.category_name}
                                <br />
                                <b>Price : </b>
                                {roomCategory.price}
                              </TableCell>

                              <TableCell>{roomCategory.description}</TableCell>
                              <TableCell>
                                <div className="">
                                  <Button
                                    onClick={() => {
                                      setOpenModalEdit(true);
                                      setFormData(roomCategory);
                                    }}
                                    color="gray"
                                    className="w-full mb-2"
                                  >
                                    <FaUserEdit className="h-4 w-4 " />
                                    Edit
                                  </Button>

                                  <Button
                                    onClick={() => {
                                      setShowDeleteConfirmetion(true); // Open the modal
                                      setUserIdToDelete(roomCategory.id); // Set the ID of the category to delete
                                    }}
                                    color="gray"
                                  >
                                    <MdDeleteForever className=" h-4 w-4" />
                                    Delete
                                  </Button>
                                </div>
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
