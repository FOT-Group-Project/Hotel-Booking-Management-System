const express = require("express");
const bookedController = require("../controllers/booked.controller");

const router = express.Router();

router.post("/checkin", bookedController.checkIn);
router.post("/checkout", bookedController.checkOut);
router.post("/cancel", bookedController.cancelCheckIn);
router.get("/checked-details", bookedController.getAllDetailsChecked);
router.get("/checked-out-details", bookedController.getAllDetailsCheckedOut);

module.exports = router;
