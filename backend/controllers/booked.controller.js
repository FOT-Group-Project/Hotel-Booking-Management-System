const models = require("../models");

// Create a new check-in using stored procedure
function checkIn(req, res) {
  const { room_id, name, contact_no, date_in, date_out, booked_cid } = req.body;

  const ref_no =
    "RFC-" + name.split(" ")[0].toUpperCase() + "-" + room_id + "-" + date_in;

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
      "CALL CheckInProcedure(:ref_no, :room_id, :name, :contact_no, :date_in, :date_out, :booked_cid)",
      {
        replacements: {
          ref_no,
          room_id,
          name,
          contact_no,
          date_in,
          date_out,
          booked_cid,
        },
      }
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Check-in completed successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

// Create a new check-out using stored procedure
function checkOut(req, res) {
  const { ref_no, room_id } = req.body;

  models.sequelize
    .query("CALL CheckOutProcedure(:ref_no, :room_id)", {
      replacements: { ref_no, room_id },
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Check-out completed successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

// Cancel a check-in using stored procedure
async function cancelCheckIn(req, res) {
  const { ref_no, room_id } = req.body;

  try {
    await models.sequelize.query(
      "CALL CancelCheckInProcedure(:ref_no, :room_id)",
      {
        replacements: { ref_no, room_id },
      }
    );
    res.status(200).json({
      success: true,
      message: `Check-in canceled successfully for reference number ${ref_no}.`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error.message || "An error occurred while canceling the check-in.",
    });
  }
}

// Edit check-in details using stored procedure
async function editCheckIn(req, res) {
  const { ref_no, new_room_id, name, contact_no, date_in, date_out } = req.body;

  try {
    // Call the stored procedure with the necessary parameters
    await models.sequelize.query(
      "CALL EditCheckInProcedure(:ref_no, :new_room_id, :name, :contact_no, :date_in, :date_out)",
      {
        replacements: {
          ref_no,
          new_room_id,
          name,
          contact_no,
          date_in,
          date_out,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Check-in details updated successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to edit check-in details.",
    });
  }
}

// Get all Checked table data using view
function getAllDetailsChecked(req, res) {
  models.sequelize
    .query("SELECT * FROM CheckedDetails")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Checked data fetched successfully",
        data: result[0],
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

// Get all CheckedOut table data using view
function getAllDetailsCheckedOut(req, res) {
  models.sequelize
    .query("SELECT * FROM CheckedDetails WHERE status = 1")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Checked out data fetched successfully",
        data: result[0],
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

module.exports = {
  checkIn: checkIn,
  checkOut: checkOut,
  cancelCheckIn: cancelCheckIn,
  editCheckIn: editCheckIn,
  getAllDetailsChecked: getAllDetailsChecked,
  getAllDetailsCheckedOut: getAllDetailsCheckedOut,
};
