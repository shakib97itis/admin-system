const express = require("express");
const router = express.Router();
const { RegisterViaInvite } = require("../../controllers/Register.controller");

router.route("/register-via-invite").post(RegisterViaInvite);

module.exports = router;