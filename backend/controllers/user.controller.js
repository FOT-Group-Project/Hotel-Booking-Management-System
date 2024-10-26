const models = require("../models");

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

  models.User.destroy({
    where: {
      id: id,
    },
  })
    .then((user) => {
      res.status(200).json({
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

module.exports = {
  createUser: createUser,
  deleteUser: deleteUser,
};
