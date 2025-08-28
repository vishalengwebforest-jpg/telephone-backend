const router = require("express").Router();
const { v1 } = require("../../../controller");
const { validation, authCheck } = require("../../../middleware");
const { ErrorUtils } = require("../../../utils");
const { materialValidation, commonValidation } = require("../../../validation");
const materialCtrl = new v1.AdminModule.MaterialCtrl();

router.post(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationBodySchema(materialValidation.materialAdd),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await materialCtrl.addMaterial(req, res);
    return res.status(result.statusCode).send(result);
  })
);

router.put(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationBodySchema(materialValidation.materialEdit),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await materialCtrl.editMaterial(req);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationQuerySchema(
    commonValidation.uuidValidation("materialId")
  ),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await materialCtrl.getMaterialById(req);
    return res.status(result.statusCode).send(result);
  })
);

router.delete(
  "/:materialId",
  authCheck.tokenCheck("Admin"),
  validation.validationParamsSchema(
    commonValidation.uuidValidation("materialId")
  ),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await materialCtrl.deleteMaterial(req);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/list",
  authCheck.tokenCheck("Admin"),
  validation.validationQuerySchema(commonValidation.paginationValidation),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await materialCtrl.getMaterialList(req);
    return res.status(result.statusCode).send(result);
  })
);

module.exports = router;
