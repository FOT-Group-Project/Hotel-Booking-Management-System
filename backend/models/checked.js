"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Checked extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Checked.init(
    {
      ref_no: DataTypes.STRING,
      room_id: DataTypes.INTEGER,
      name: DataTypes.TEXT,
      contact_no: DataTypes.STRING,
      date_in: DataTypes.DATE,
      date_out: DataTypes.DATE,
      booked_cid: DataTypes.INTEGER,
      status: DataTypes.TINYINT,
      date_updated: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Checked",
      paranoid: true,
    }
  );
  return Checked;
};
