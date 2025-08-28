const router = require("express").Router();
const { v1 } = require("../../../controller");
const { ImageUtils, ErrorUtils } = require("../../../utils");
const productVariantCtrl = new v1.AdminModule.ProductVariantCtrl();
const upload = ImageUtils.uploadImage();

router.post(
  "/",
  upload.array("images", 10),
  ErrorUtils.asyncHandler(async (req, res) => {
    const result = await productVariantCtrl.createVariant(req);
    return res.status(result.statusCode).send(result);
  })
);

module.exports = router;
