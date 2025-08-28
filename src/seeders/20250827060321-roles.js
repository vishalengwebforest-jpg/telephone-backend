"use strict";
const { db } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await db.Role.create({
      name: "ADMIN",
    });
  },

  async down(queryInterface, Sequelize) {
    await db.Role.destroy({
      where: {
        name: "ADMIN",
      },
    });
  },
};
