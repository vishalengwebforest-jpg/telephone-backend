const router = require("express").Router();
const { v1 } = require("../../../controller");
const { validation, authCheck } = require("../../../middleware");
const { ErrorUtils } = require("../../../utils");
const { storageValidation, commonValidation } = require("../../../validation");
const storageCtrl = new v1.AdminModule.StorageCtrl();

router.post(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationBodySchema(storageValidation.sizeAdd),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await storageCtrl.addStorage(req, res);
    return res.status(result.statusCode).send(result);
  })
);

router.put(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationBodySchema(storageValidation.sizeEdit),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await storageCtrl.editStorage(req);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationQuerySchema(
    commonValidation.uuidValidation("storageId")
  ),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await storageCtrl.getStorageById(req);
    return res.status(result.statusCode).send(result);
  })
);

router.delete(
  "/:storageId",
  authCheck.tokenCheck("Admin"),
  validation.validationParamsSchema(
    commonValidation.uuidValidation("storageId")
  ),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await storageCtrl.deleteStorage(req);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/list",
  authCheck.tokenCheck("Admin"),
  validation.validationQuerySchema(commonValidation.paginationValidation),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await storageCtrl.getStorageList(req);
    return res.status(result.statusCode).send(result);
  })
);

module.exports = router;
