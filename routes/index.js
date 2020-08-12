const router = require("express").Router();

router.use("/", require("./apiRoutes"));

module.exports = router;