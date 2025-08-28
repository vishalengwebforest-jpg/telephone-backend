require("dotenv").config();

module.exports = {
  development: {
    username: process.env[`DB_USER_${process.env.RUN_MODE}`],
    password: process.env[`DB_PASSWORD_${process.env.RUN_MODE}`],
    database: process.env[`DB_DATABASE_${process.env.RUN_MODE}`],
    host: process.env[`DB_HOST_${process.env.RUN_MODE}`],
    dialect: process.env[`DB_DIALECT_${process.env.RUN_MODE}`],
  },
  test: {
    username: process.env[`DB_USER_${process.env.RUN_MODE}`],
    password: process.env[`DB_PASSWORD_${process.env.RUN_MODE}`],
    database: process.env[`DB_DATABASE_${process.env.RUN_MODE}`],
    host: process.env[`DB_HOST_${process.env.RUN_MODE}`],
    dialect: process.env[`DB_DIALECT_${process.env.RUN_MODE}`],
  },
  production: {
    username: process.env[`DB_USER_${process.env.RUN_MODE}`],
    password: process.env[`DB_PASSWORD_${process.env.RUN_MODE}`],
    database: process.env[`DB_DATABASE_${process.env.RUN_MODE}`],
    host: process.env[`DB_HOST_${process.env.RUN_MODE}`],
    dialect: process.env[`DB_DIALECT_${process.env.RUN_MODE}`],
  },
};
