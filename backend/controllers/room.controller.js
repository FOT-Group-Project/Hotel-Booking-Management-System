const models = require("../models");

// Get all room using stored procedure
function getRooms(req, res) {
  models.sequelize
    .query("CALL GetRooms()")
    .then((rooms) => {
      res.status(200).json({
        success: true,
        rooms: rooms,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

// Create a new room using stored procedure
function createRoom(req, res) {
  const { room_name, category_id } = req.body;
  const status = "available";

  models.sequelize
    .query("CALL CreateRoom(:room_name, :category_id, :status)", {
      replacements: { room_name, category_id, status },
    })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Room created successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

// Update room category using stored procedure
function updateRoom(req, res) {
  const { id } = req.params;
  const { room_name, category_id, status } = req.body;

  models.sequelize
    .query("CALL UpdateRoom(:id, :room_name, :category_id, :status)", {
      replacements: { id, room_name, category_id, status },
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Room updated successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

// Delete room category using stored procedure
function deleteRoom(req, res) {
  const { id } = req.params;

  models.sequelize
    .query("CALL DeleteRoom(:id)", {
      replacements: { id },
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Room deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
}

// Get all room details using view
function getRoomsAllDetails(req, res) {
  models.sequelize
    .query("SELECT * FROM RoomDetails")
    .then((rooms) => {
      res.status(200).json({
        success: true,
        rooms: rooms[0],
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
  getRooms: getRooms,
  createRoom: createRoom,
  updateRoom: updateRoom,
  deleteRoom: deleteRoom,
  getRoomsAllDetails: getRoomsAllDetails,
};
