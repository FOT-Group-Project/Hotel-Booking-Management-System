const express = require("express");
const roomCategoryController = require("../controllers/roomcategory.controller");
const { getUploader } = require("../utils/image-uploader");

const router = express.Router();

const uploadImage = getUploader("room_category").single("image");

router.get("/getroomcategories", roomCategoryController.getRoomCategories);
router.post(
  "/createroomcategory",
  uploadImage,
  roomCategoryController.createRoomCategory
);
router.delete(
  "/deleteroomcategory/:id",
  roomCategoryController.deleteRoomCategory
);
router.put(
  "/updateroomcategory/:id",
  uploadImage,
  roomCategoryController.updateRoomCategory
);

module.exports = router;
