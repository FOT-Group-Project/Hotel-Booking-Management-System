const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/getusers", userController.getUsers);
router.post("/create", userController.createUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/getcustomers", userController.getCustomers);

module.exports = router;
