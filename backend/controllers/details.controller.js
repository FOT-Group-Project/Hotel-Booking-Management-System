const models = require("../models");

function detailsForOverView(req, res) {
  models.sequelize
    .query("CALL GetAllRevenueAndStatistics();")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Overview details fetched successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.error("Error fetching overview details:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching overview details." });
    });
}

module.exports = {
  detailsForOverView: detailsForOverView,
};
