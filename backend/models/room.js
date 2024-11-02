"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init(
    {
      room_name: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      availability: DataTypes.BOOLEAN,
      status: {
        type: DataTypes.ENUM,
        values: ["available", "occupied", "maintenance"],
        defaultValue: "available", // Default to available when a new room is created
      },
    },
    {
      sequelize,
      modelName: "Room",
      paranoid: true,
    }
  );
  return Room;
};
