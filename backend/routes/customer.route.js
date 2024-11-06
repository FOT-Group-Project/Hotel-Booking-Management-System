const express = require("express");
const customerController = require("../controllers/customer.controller");

const router = express.Router();

router.get("/getcustomers", customerController.getCustomers);
router.post("/create", customerController.createCustomer);
router.put("/update/:id", customerController.updateCustomer);
router.delete("/delete/:id", customerController.deleteCustomer);

module.exports = router;
