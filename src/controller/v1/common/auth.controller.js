const { success, notFound } = require("../../../response");
const { UserService } = require("../../../services");
const { db } = require("../../../models");
const { BcryptUtil, jwtUtils } = require("../../../utils");

class AuthController {
  constructor() {
    this.userService = new UserService(db.User, db.Role, db.UserRole);
  }

  login = async (req, res) => {
    const { email, password } = req.body;
    const isExist = await this.userService.isExistUserEmail(email);

    if (!isExist) {
      return notFound("Could not matching record found");
    }

    const isPassword = await BcryptUtil.comparePassword(
      password,
      isExist.password
    );

    delete isExist.dataValues.password;
    if (isPassword) {
      const jwtPayload = { email: email };
      const accessToken = await jwtUtils.jwtAccessTokenGenereate(jwtPayload);
      const refreshToken = await jwtUtils.jwtRefreshTokenGenereate(jwtPayload);

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      isExist.dataValues.access_token = accessToken;
      return success("Login successfully", isExist);
    }
  };

  userDetails = async (req) => {
    const {
      userDetails: { email },
    } = req.headers;

    const userDetails = await this.userService.isExistUserEmail(email);

    if (!userDetails) {
      return notFound("Could not matching recored found");
    }
    return success("Get user details successfully", userDetails);
  };
}

module.exports = AuthController;
