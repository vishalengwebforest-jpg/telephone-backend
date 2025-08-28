const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/category", require("./category.routes"));
router.use("/matrial", require("./category.routes"));

module.exports = router;
