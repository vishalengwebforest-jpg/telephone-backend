"use strict";
const { BcryptUtil } = require("../utils");
const { db } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roleDetails = await db.Role.findOne({ where: { name: "ADMIN" } });

    const userData = {
      email: "admin@gmail.com",
      password: await BcryptUtil.hashPassword("admin@123"),
    };

    const userDetails = await db.User.create(userData);

    if (userDetails) {
      await db.UserRole.create({
        user_fk: userDetails.id,
        role_fk: roleDetails.id,
      });
    }
  },

  
  async down(queryInterface, Sequelize) {
    const roleDetails = await db.Role.findOne({ where: { name: "ADMIN" } });
    const findAdmin = await db.UserRole.findOne({
      where: {
        role_fk: roleDetails.id,
      },
    });

    await db.User.destroy({
      where: {
        id: findAdmin.user_fk,
      },
    });
  },
};
