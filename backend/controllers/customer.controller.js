const models = require("../models");

// Get all customers using stored procedure
function getCustomers(req, res) {
  models.sequelize
    .query("SELECT * FROM GetCustomers")
    .then((customers) => {
      res.status(200).json({
        success: true,
        customers: customers[0],
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

// Create a new customer using stored procedure
function createCustomer(req, res) {
  const { p_name, p_contact_no, p_email } = req.body;

  models.sequelize
    .query("CALL CreateCustomer(:p_name, :p_contact_no, :p_email)", {
      replacements: { p_name, p_contact_no, p_email },
    })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Customer created successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

// Update customer using stored procedure
function updateCustomer(req, res) {
  const { id } = req.params;
  const { p_name, p_contact_no, p_email } = req.body;

  models.sequelize
    .query("CALL UpdateCustomer(:id, :p_name, :p_contact_no, :p_email)", {
      replacements: { id, p_name, p_contact_no, p_email },
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Customer updated successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

// Delete customer using stored procedure
function deleteCustomer(req, res) {
  const { id } = req.params;

  models.sequelize
    .query("CALL DeleteCustomer(:id)", {
      replacements: { id },
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Customer deleted successfully",
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
  getCustomers: getCustomers,
  createCustomer: createCustomer,
  updateCustomer: updateCustomer,
  deleteCustomer: deleteCustomer,
};
