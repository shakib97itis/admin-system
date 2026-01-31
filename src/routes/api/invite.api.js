const express = require("express");
const router = express.Router();
const {
  CreateInvite,
  VerifyInviteToken,
} = require("../../controllers/Invite.controllers");
const { isAdmin } = require("../../middlewares/role.middleware");
const { isAuthenticated } = require("../../middlewares/auth.middleware");

router.route("/create-invite").post(CreateInvite);
router.route("/verify-invite-token").post(VerifyInviteToken);
module.exports = router;
