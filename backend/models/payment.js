"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init(
    {
      booking_id: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
      transaction_id: DataTypes.STRING,
      payment_method: DataTypes.ENUM(
        "cash",
        "credit_card",
        "debit_card",
        "online"
      ),
      payment_status: DataTypes.ENUM("pending", "success", "failed"),
    },
    {
      sequelize,
      modelName: "Payment",
      paranoid: true,
    }
  );
  return Payment;
};
