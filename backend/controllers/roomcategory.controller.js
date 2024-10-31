const models = require("../models");

function createRoomCategory(req, res) {
  const { category_name, price, description } = req.body;
  models.RoomCategory.findOne({ where: { category_name: category_name } })
    .then((roomcategory) => {
      if (roomcategory) {
        res.status(400).json({
          success: false,
          message: "Category already exists",
        });
      } else {
        models.RoomCategory.create({
          category_name: category_name,
          price: price,
          description: description,
        })
          .then((roomcategory) => {
            res.status(201).json({
              success: true,
              roomcategory: roomcategory,
            });
          })
          .catch((err) => {
            res.status(400).json({
              success: false,
              message: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

function getRoomCategories(req, res) {
  models.RoomCategory.findAll()
    .then((roomcategories) => {
      res.status(200).json({
        success: true,
        roomcategories: roomcategories,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

function deleteRoomCategory(req, res) {
  const { id } = req.params;
  models.RoomCategory.findByPk(id)
    .then((roomcategory) => {
      if (!roomcategory) {
        res.status(404).json({
          success: false,
          message: "Room category not found",
        });
      } else {
        roomcategory
          .destroy()
          .then(() => {
            res.status(200).json({
              success: true,
              message: "Room category deleted successfully",
            });
          })
          .catch((err) => {
            res.status(400).json({
              success: false,
              message: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

function updateRoomCategory(req, res) {
  const { id } = req.params;
  const { category_name, price, description } = req.body;
  models.RoomCategory.findByPk(id)
    .then((roomcategory) => {
      if (!roomcategory) {
        res.status(404).json({
          success: false,
          message: "Room category not found",
        });
      } else {
        roomcategory
          .update({
            category_name: category_name,
            price: price,
            description: description,
          })
          .then((roomcategory) => {
            res.status(200).json({
              success: true,
              roomcategory: roomcategory,
            });
          })
          .catch((err) => {
            res.status(400).json({
              success: false,
              message: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

module.exports = {
  getRoomCategories: getRoomCategories,
  createRoomCategory: createRoomCategory,
  deleteRoomCategory: deleteRoomCategory,
  updateRoomCategory: updateRoomCategory,
};
