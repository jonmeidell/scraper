const router = require("express").Router();

router.use("/", require("./viewRoutes"));
router.use("/api", require("./apiRoutes"));

module.exports = router;