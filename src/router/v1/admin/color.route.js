const router = require("express").Router();
const { v1 } = require("../../../controller");
const { validation, authCheck } = require("../../../middleware");
const { ErrorUtils } = require("../../../utils");
const { colorValidation, commonValidation } = require("../../../validation");
const colorCtrl = new v1.AdminModule.ColorCtrl();

router.post(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationBodySchema(colorValidation.colorAdd),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await colorCtrl.addColor(req, res);
    return res.status(result.statusCode).send(result);
  })
);

router.put(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationBodySchema(colorValidation.colorEdit),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await colorCtrl.editColor(req);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationQuerySchema(
    commonValidation.uuidValidation("colorId")
  ),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await colorCtrl.getColorById(req);
    return res.status(result.statusCode).send(result);
  })
);

router.delete(
  "/:colorId",
  authCheck.tokenCheck("Admin"),
  validation.validationParamsSchema(
    commonValidation.uuidValidation("colorId")
  ),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await colorCtrl.deleteColor(req);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/list",
  authCheck.tokenCheck("Admin"),
  validation.validationQuerySchema(commonValidation.paginationValidation),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await colorCtrl.getColorList(req);
    return res.status(result.statusCode).send(result);
  })
);

module.exports = router;
