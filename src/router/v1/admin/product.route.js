const router = require("express").Router();
const { v1 } = require("../../../controller");
const { validation, authCheck } = require("../../../middleware");
const { ErrorUtils } = require("../../../utils");
const { productValidation, commonValidation } = require("../../../validation");
const productCtrl = new v1.AdminModule.ProductCtrl();

router.post(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationBodySchema(productValidation.productAdd),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await productCtrl.addProduct(req, res);
    return res.status(result.statusCode).send(result);
  })
);

router.put(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationBodySchema(productValidation.productEdit),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await productCtrl.editProduct(req);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/",
  authCheck.tokenCheck("Admin"),
  validation.validationQuerySchema(
    commonValidation.uuidValidation("productId")
  ),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await productCtrl.getProductById(req);
    return res.status(result.statusCode).send(result);
  })
);

router.delete(
  "/:productId",
  authCheck.tokenCheck("Admin"),
  validation.validationParamsSchema(
    commonValidation.uuidValidation("productId")
  ),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await productCtrl.deleteProduct(req);
    return res.status(result.statusCode).send(result);
  })
);

router.get(
  "/list",
  authCheck.tokenCheck("Admin"),
  validation.validationQuerySchema(commonValidation.paginationValidation),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await productCtrl.getProductList(req);
    return res.status(result.statusCode).send(result);
  })
);

module.exports = router;
