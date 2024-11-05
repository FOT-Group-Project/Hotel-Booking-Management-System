const express = require("express");
const detailsController = require("../controllers/details.controller");

const router = express.Router();

router.get("/details-overview", detailsController.detailsForOverView);

module.exports = router;
