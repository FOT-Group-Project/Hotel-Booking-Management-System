"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feedback.init(
    {
      booking_id: DataTypes.INTEGER,
      customer_name: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      comments: DataTypes.TEXT,
      feedback_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Feedback",
      paranoid: true,
    }
  );
  return Feedback;
};
