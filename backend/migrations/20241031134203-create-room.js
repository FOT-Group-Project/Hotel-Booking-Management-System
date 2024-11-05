"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      room_name: {
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      availability: {
        type: Sequelize.BOOLEAN,
      },
      status: {
        type: Sequelize.ENUM("available", "occupied", "maintenance"),
        defaultValue: "available",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    // Drop the status ENUM type before dropping the table to avoid ENUM type conflicts
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Rooms_status";'
    );
    await queryInterface.dropTable("Rooms");
  },
};
