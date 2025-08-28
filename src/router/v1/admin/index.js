const router = require("express").Router();

router.use("/material", require("./material.route"));
router.use("/color", require("./color.route"));
router.use("/storage", require("./storage.route"));
router.use("/size-connectivity", require("./sizeconnectivity.route"));
router.use("/product", require("./product.route"));
router.use("/product-variant", require("./productvariant.route"));

module.exports = router;
