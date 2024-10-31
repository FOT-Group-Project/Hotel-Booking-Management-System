const models = require("../models");

//get all rooms
function getRooms(req, res) {
  models.Room.findAll()
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

//Create a new room
function createRoom(req, res) {
  const { room_name, category_id, user_id, availability } = req.body;
  models.Room.findOne({
    where: {
      room_name: room_name,
    },
  })
    .then((room) => {
      if (room) {
        res.status(400).json({
          success: false,
          message: "Room already exists",
        });
      } else {
        models.Room.create({
          room_name: room_name,
          category_id: category_id,
          user_id: user_id,
          availability: availability,
        })
          .then((room) => {
            res.status(201).json({
              success: true,
              room: room,
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

//Update a room
function updateRoom(req, res) {
  const { id } = req.params;
  const { room_name, category_id, user_id, availability } = req.body;
  models.Room.findByPk(id).then((room) => {
    if (!room) {
      res.status(400).json({
        success: false,
        message: "Room not found",
      });
    } else {
      room.room_name = room_name;
      room.category_id = category_id;
      room.user_id = user_id;
      room.availability = availability;
      room
        .save()
        .then((room) => {
          res.status(200).json({
            success: true,
            room: room,
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

//Delete a room
function deleteRoom(req, res) {
  const { id } = req.params;
  models.Room.findByPk(id).then((room) => {
    if (!room) {
      res.status(400).json({
        success: false,
        message: "Room not found",
      });
    } else {
      room
        .destroy()
        .then(() => {
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
  });
}

module.exports = {
  getRooms: getRooms,
  createRoom: createRoom,
  updateRoom: updateRoom,
  deleteRoom: deleteRoom,
};
