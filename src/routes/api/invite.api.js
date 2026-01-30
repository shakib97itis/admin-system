const express = require("express");
const router = express.Router();
const { CreateInvite } = require("../../controllers/Invite.controllers");

router.route("/create-invite").post(CreateInvite);
module.exports = router;