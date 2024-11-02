const express = require("express");
const bookedController = require("../controllers/booked.controller");

const router = express.Router();

router.post("/checkin", bookedController.checkIn);
router.post("/checkout", bookedController.checkOut);

module.exports = router;
