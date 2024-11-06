const models = require("../models");

// Get all booking details using stored procedure
function getAllBookingDetails(req, res) {
  try {
    models.sequelize
      .query("SELECT * FROM GetBookingDetails")
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Booking data fetched successfully",
          data: result[0],
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: err.message,
        });
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Create a new booking using stored procedure
function createBooking(req, res) {
  const { room_id, customer_id, check_in, check_out } = req.body;

  if (new Date(date_in) > new Date(date_out)) {
    return res.status(400).json({
      success: false,
      message: "Check-in date should be less than check-out date",
    });
  }

  if (new Date(date_in) + 1 < new Date()) {
    return res.status(400).json({
      success: false,
      message: "Check-in date should be future date",
    });
  }

  if (new Date(date_out) < new Date()) {
    return res.status(400).json({
      success: false,
      message: "Check-out date should be future date",
    });
  }

  if (new Date(date_out) < new Date(date_in)) {
    return res.status(400).json({
      success: false,
      message: "Check-out date should be greater than check-in date",
    });
  }

  models.sequelize
    .query(
      "CALL CreateBooking(:room_id, :customer_id, :check_in, :check_out)",
      {
        replacements: {
          room_id,
          customer_id,
          check_in,
          check_out,
        },
      }
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Booking created successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Booking creation failed",
        error: err.message,
      });
    });
}

// Edit a booking using stored procedure
function editBooking(req, res) {
  const { booking_id, room_id, check_in, check_out } = req.body;

  if (!booking_id) {
    return res.status(400).json({
      success: false,
      message: "Booking ID is required",
    });
  }

  if (!room_id) {
    return res.status(400).json({
      success: false,
      message: "Room ID is required",
    });
  }

  if (!check_in) {
    return res.status(400).json({
      success: false,
      message: "Check-in date is required",
    });
  }

  if (!check_out) {
    return res.status(400).json({
      success: false,
      message: "Check-out date is required",
    });
  }

  if (new Date(check_in) > new Date(check_out)) {
    return res.status(400).json({
      success: false,
      message: "Check-in date should be less than check-out date",
    });
  }

  if (new Date(check_in) + 1 < new Date()) {
    return res.status(400).json({
      success: false,
      message: "Check-in date should be future date",
    });
  }

  if (new Date(check_out) < new Date()) {
    return res.status(400).json({
      success: false,
      message: "Check-out date should be future date",
    });
  }

  if (new Date(check_out) < new Date(check_in)) {
    return res.status(400).json({
      success: false,
      message: "Check-out date should be greater than check-in date",
    });
  }

  models.sequelize
    .query("CALL EditBooking(:booking_id, :room_id, :check_in, :check_out)", {
      replacements: {
        booking_id,
        room_id,
        check_in,
        check_out,
      },
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Booking edited successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Booking edit failed",
        error: err.message,
      });
    });
}

// Cancel a booking using stored procedure
function cancelBooking(req, res) {
  const { booking_id } = req.params;

  if (!booking_id) {
    return res.status(400).json({
      success: false,
      message: "Booking ID is required",
    });
  }

  models.sequelize
    .query("CALL CancelBooking(:booking_id)", {
      replacements: {
        booking_id,
      },
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Booking cancellation failed",
        error: err.message,
      });
    });
}

module.exports = {
  getAllBookingDetails: getAllBookingDetails,
  createBooking: createBooking,
  editBooking: editBooking,
  cancelBooking: cancelBooking,
};
