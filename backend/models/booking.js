"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init(
    {
      reference_number: DataTypes.STRING,
      room_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      date_in: DataTypes.DATE,
      date_out: DataTypes.DATE,
      status: DataTypes.ENUM(
        "pending",
        "confirmed",
        "cancelled",
        "checked_in",
        "checked_out"
      ),
    },
    {
      sequelize,
      modelName: "Booking",
      paranoid: true,
    }
  );
  return Booking;
};
