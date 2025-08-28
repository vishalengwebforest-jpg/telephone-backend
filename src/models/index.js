"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/db.config.js")[env];
const db = {};
const { styleText } = require("util");

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    logging: false,
    dialect: config.dialect,
    host: config.host,
    port: process.env[`DB_PORT_${process.env.RUN_MODE}`],
    pool: {
      max: Number(process.env[`DB_MAX_${process.env.RUN_MODE}`]),
      min: Number(process.env[`DB_MIN_${process.env.RUN_MODE}`]),
      acquire: Number(process.env[`DB_ACQUIRE_${process.env.RUN_MODE}`]),
      idle: Number(process.env[`DB_IDLE_${process.env.RUN_MODE}`]),
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      styleText("blue", "✅  Connection has been established successfully.")
    );
    console.log(styleText("green", `  DB_NAME: ${config.database}`));
    console.log(
      styleText(
        "green",
        `  DB_PORT: ${process.env[`DB_PORT_${process.env.RUN_MODE}`]}`
      )
    );
    console.log(styleText("green", `  DB_HOST: ${config.host}`));
  })
  .catch((error) => {
    console.error(styleText("red", "Unable to connect to the database:"));
    console.log(styleText("gray", error.message || error));
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = { db };
