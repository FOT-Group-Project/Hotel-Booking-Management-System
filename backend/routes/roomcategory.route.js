const express = require("express");
const roomCategoryController = require("../controllers/roomcategory.controller");

const router = express.Router();

router.get("/getroomcategories", roomCategoryController.getRoomCategories);
router.post("/createroomcategory", roomCategoryController.createRoomCategory);
router.delete("/deleteroomcategory/:id", roomCategoryController.deleteRoomCategory);
router.put("/updateroomcategory/:id", roomCategoryController.updateRoomCategory);

module.exports = router;
