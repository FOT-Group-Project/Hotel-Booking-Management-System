import React, { useState, useRef } from "react";
import {
  Button,
  Label,
  TextInput,
  Select,
  Alert,
  Spinner,
} from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Profile from "../assets/add-pic.png"; // Update the path to the profile image

const RoomCategoryForm = ({
  formData,
  setFormData,
  handleSubmit,
  imageFileUploadProgress,
  imageFileUploadError,
  imageFileUploadingComplete,
  imageFileUploading,
  createUserError,
  createLoding,
}) => {
  const filePickerRef = useRef(null);

  const handelImageChange = (e) => {
    // Handle image change
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-grow gap-4"
        disabled={imageFileUploading}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handelImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={formData.profilepicurl || Profile}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-4 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        {imageFileUploadingComplete && (
          <Alert color="success">Image uploaded successfully</Alert>
        )}
        {createUserError && <Alert color="failure">{createUserError}</Alert>}
        <div className="flex gap-2 justify-between">
          <div>
            <div className="mb-2 block">
              <Label value="User name" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="@username"
              required
              shadow
              onChange={handleChange}
              disabled={imageFileUploading}
              value={formData.username}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="First name" />
            </div>
            <TextInput
              id="firstname"
              type="text"
              placeholder="First name"
              required
              shadow
              onChange={handleChange}
              disabled={imageFileUploading}
              value={formData.firstname}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Last Name" />
            </div>
            <TextInput
              id="lastname"
              type="text"
              placeholder="Last name"
              required
              shadow
              onChange={handleChange}
              disabled={imageFileUploading}
              value={formData.lastname}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-between">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Phone number" />
            </div>
            <TextInput
              id="phone"
              type="text"
              placeholder="+94 xx xxx xxxx"
              required
              shadow
              onChange={handleChange}
              disabled={imageFileUploading}
              value={formData.phone}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Email address" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@gmail.com"
              required
              shadow
              onChange={handleChange}
              disabled={imageFileUploading}
              value={formData.email}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="**********"
              required
              shadow
              onChange={handleChange}
              disabled={imageFileUploading}
            />
          </div>
        </div>
        <div className="gap-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Role" />
            </div>
            <Select
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              id="role"
              required
              shadow
              defaultValue={formData.role}
            >
              <option value="SelectRole">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Director">Director</option>
              <option value="Seller">Seller</option>
              <option value="StoreKeeper">Store Keeper</option>
              <option value="StockQA">StockQA</option>
              <option value="Accountant">Accountant</option>
            </Select>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button color="blue" type="submit" disabled={createLoding}>
            {createLoding ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Update User"
            )}
          </Button>
          <Button
            size="sm"
            color="gray"
            onClick={() => setOpenModalEdit(false)}
          >
            Decline
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RoomCategoryForm;
