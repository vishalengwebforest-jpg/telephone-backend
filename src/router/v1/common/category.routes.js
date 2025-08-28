const router = require("express").Router();
const { v1 } = require("../../../controller");
const { validation, authCheck } = require("../../../middleware");
const { ErrorUtils } = require("../../../utils");
const { categoryValidation, commonValidation } = require("../../../validation");
const categoryCtrl = new v1.CommonModule.CategoryCtrl();

router.post(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationBodySchema(categoryValidation.createCategory),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await categoryCtrl.addNewCategory(req, res);
    return res.status(result.statusCode).send(result);
  })
);

router.put(
  "/",
  validation.validationBodySchema(categoryValidation.editCategory),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await categoryCtrl.editCategory(req);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/",
  validation.validationQuerySchema(commonValidation.uuidValidation),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await categoryCtrl.getCategory(req);
    return res.status(result.statusCode).send(result);
  })
);

router.delete(
  "/:categoryId",
  validation.validationParamsSchema(
    commonValidation.uuidValidation("categoryId")
  ),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await categoryCtrl.deleteCategory(req);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/list",
  validation.validationQuerySchema(commonValidation.paginationValidation),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await categoryCtrl.getCategoryList(req);
    return res.status(result.statusCode).send(result);
  })
);

module.exports = router;
