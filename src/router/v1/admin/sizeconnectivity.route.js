const router = require("express").Router();
const { v1 } = require("../../../controller");
const { validation, authCheck } = require("../../../middleware");
const { ErrorUtils } = require("../../../utils");
const {
  sizeConnentivityValidation,
  commonValidation,
} = require("../../../validation");
const sizeConnentivityCtrl = new v1.AdminModule.SizeConnentivityCtrl();

router.post(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationBodySchema(
    sizeConnentivityValidation.sizeConnectivityAdd
  ),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await sizeConnentivityCtrl.addSizeConnectivity(req, res);
    return res.status(result.statusCode).send(result);
  })
);

router.put(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationBodySchema(
    sizeConnentivityValidation.sizeConnectivityEdit
  ),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await sizeConnentivityCtrl.editSizeConnectivity(req);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationQuerySchema(commonValidation.uuidValidation("sizeConnectivityId")),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await sizeConnentivityCtrl.getSizeConnectivityById(req);
    return res.status(result.statusCode).send(result);
  })
);

router.delete(
  "/:sizeConnectivityId",
  authCheck.tokenCheck("Admin"),
  validation.validationParamsSchema(commonValidation.uuidValidation("sizeConnectivityId")),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await sizeConnentivityCtrl.deleteSizeConnectivity(req);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/list",
  authCheck.tokenCheck("Admin"),
  validation.validationQuerySchema(commonValidation.paginationValidation),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await sizeConnentivityCtrl.getSizeConnectivityList(req);
    return res.status(result.statusCode).send(result);
  })
);

module.exports = router;
