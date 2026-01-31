const express = require("express");
const router = express.Router();
const {
  RegisterViaInvite,
  Login,
} = require("../../controllers/user.controllers");

router.route("/register-via-invite").post(RegisterViaInvite);
router.route("/login").post(Login);

module.exports = router;
