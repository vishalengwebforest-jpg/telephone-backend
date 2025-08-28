require('dotenv').config()
const jwt = require("jsonwebtoken");

const jwtAccessSecret =
  process.env[`JWT_ACCESS_SECRET_${process.env.RUN_MODE}`];
const jwtAccessAlgo = process.env[`JWT_ACCESS_ALGO_${process.env.RUN_MODE}`];

const jwtRefreshSecret =
  process.env[`JWT_REFRESH_SECRET_${process.env.RUN_MODE}`];
const jwtRefreshAlgo = process.env[`JWT_REFRESH_ALGO_${process.env.RUN_MODE}`];

module.exports = {
  jwtAccessTokenGenereate: (payload) => {
    return jwt.sign(payload, jwtAccessSecret, {
      algorithm: jwtAccessAlgo,
      expiresIn: "1h",
    });
  },

  jwtAccessTokenVerify: (token) => {
    return jwt.verify(token, jwtAccessSecret);
  },

  jwtRefreshTokenGenereate: (payload) => {
    return jwt.sign(payload, jwtRefreshSecret, {
      algorithm: jwtRefreshAlgo,
      expiresIn: "30day",
    });
  },

  jwtRefreshTokenVerify: (token) => {
    return jwt.verify(token, jwtRefreshSecret);
  },
};
