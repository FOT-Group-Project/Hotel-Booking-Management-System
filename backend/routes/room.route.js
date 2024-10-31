const express = require("express");
const roomController = require("../controllers/room.controller");

const router = express.Router();

router.get("/getrooms", roomController.getRooms);
router.post("/create", roomController.createRoom);
router.put("/update/:id", roomController.updateRoom);
router.delete("/delete/:id", roomController.deleteRoom);

module.exports = router;
