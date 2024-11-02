"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Checkeds", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ref_no: {
        type: Sequelize.STRING,
      },
      room_id: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
      },
      contact_no: {
        type: Sequelize.STRING,
      },
      date_in: {
        type: Sequelize.DATE,
      },
      date_out: {
        type: Sequelize.DATE,
      },
      booked_cid: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.TINYINT,
      },
      date_updated: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Checkeds");
  },
};
