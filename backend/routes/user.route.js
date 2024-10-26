const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/create", userController.createUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
