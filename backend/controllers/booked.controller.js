const models = require("../models");

// Create a new check-in using stored procedure
function checkIn(req, res) {
  const { ref_no, room_id, name, contact_no, date_in, date_out, booked_cid } =
    req.body;

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
        .query(
            "CALL CheckOutProcedure(:ref_no, :room_id)",
            {
                replacements: { ref_no, room_id },
            }
        )
        .then((result) => {
            res.status(200).json({
                success: true,
                message: "Check-out completed successfully",
                data: result
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
};
