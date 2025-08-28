const router = require("express").Router();
const { v1 } = require("../../../controller");
const { validation, authCheck } = require("../../../middleware");
const { ErrorUtils } = require("../../../utils");
const { authValidation } = require("../../../validation");
const authController = new v1.CommonModule.AuthCtrl();

router.post(
  "/login",
  validation.validationBodySchema(authValidation.loginValidation),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await authController.login(req, res);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/user-details",
  authCheck.tokenCheck(["Admin"]),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await authController.userDetails(req, res);
    return res.status(result.statusCode).send(result);
  })
);

module.exports = router;
