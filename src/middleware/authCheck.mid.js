const { unAuthorization, badRequest } = require("../response");
const { jwtUtils } = require("../utils");

const checkBearerToken = (req, roleName) => {
  console.log(req.headers);
  const { authorization } = req.headers;
  if (!authorization) {
    return {
      isToken: false,
      message: "Plz token provide",
    };
  }

  const tokenSlipt = authorization.split(" ");
  const [schema, token] = tokenSlipt;

  if (tokenSlipt.length !== 2 || !/^Bearer/.test(schema)) {
    return {
      isToken: false,
      message: "Token invalid",
    };
  }

  const decode = jwtUtils.jwtAccessTokenVerify(token);

  if (decode) {
    req.headers.userDetails = decode;

    // set for test is static
    if (["Admin"].includes(roleName)) {
      return {
        isToken: true,
        message: "Token is vaild",
      };
    }
  }
};

const tokenCheck = (roleName) => async (req, res, next) => {
  try {
    const token = await checkBearerToken(req, roleName);

    console.log({ token });
    if (token.isToken) {
      next();
    } else {
      return res
        .status(401)
        .send(
          unAuthorization("You are not authorized to perform this action.")
        );
    }
  } catch (error) {
    return res.status(400).send(badRequest(error.message));
  }
};

module.exports = { tokenCheck };
