const express = require("express");
const bookingController = require("../controllers/booking.controller");

const router = express.Router();

router.get("/get-all-details", bookingController.getAllBookingDetails);
router.get("/get-pending-details", bookingController.getPendingBookingDetails);
router.post("/create", bookingController.createBooking);
router.put("/edit", bookingController.editBooking);
router.delete("/cancel/:booking_id", bookingController.cancelBooking);

module.exports = router;
