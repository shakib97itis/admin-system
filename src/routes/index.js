const express = require("express");
const router = express.Router();

router.use("/invite", require("./api/invite.api"));
router.use("/register", require("./api/register.api"));

module.exports = router;