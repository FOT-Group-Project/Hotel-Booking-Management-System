const models = require("../models");

function getUsers(req, res) {
  models.User.findAll()
    .then((users) => {
      res.status(200).json({
        success: true,
        users: users,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

function createUser(req, res) {
  const {
    username,
    firstname,
    lastname,
    phone,
    email,
    password,
    role,
    profilepicurl,
  } = req.body;

  models.User.create({
    username,
    firstname,
    lastname,
    phone,
    email,
    password,
    role,
    profilepicurl,
  })
    .then((user) => {
      res.status(201).json({
        success: true,
        user: user,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

function deleteUser(req, res) {
  const { id } = req.params;

  models.User.findByPk(id).then((user) => {
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
    } else {
      user
        .destroy()
        .then(() => {
          res.status(200).json({
            success: true,
            message: "User deleted successfully",
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: err.message,
          });
        });
    }
  });
}

// Get all customers using view GetAllCustomers in MySQL
function getCustomers(req, res) {
  try {
    models.sequelize
      .query("SELECT * FROM GetAllCustomers")
      .then((customers) => {
        res.status(200).json({
          success: true,
          customers: customers[0],
        });
      });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  getUsers: getUsers,
  createUser: createUser,
  deleteUser: deleteUser,
  getCustomers: getCustomers,
};
