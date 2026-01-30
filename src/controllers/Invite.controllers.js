const express = require("express");
const crypto = require("crypto");
const Invite = require("../models/invite.model");
const User = require("../models/user.model");
const { APIResponse } = require("../utilities/APIResponse");
const { AsyncHandler } = require("../utilities/AsyncHandler");
const { CustomError } = require("../utilities/CustomError");

exports.CreateInvite = AsyncHandler(async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    throw new CustomError(400, "Email and role are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError(500, "User already exists");
  }

  const IsInviteAlreadyExists = await Invite.findOne({
    email,
    acceptedAt: null,
    expiresAt: { $gt: new Date() },
  });
  if (IsInviteAlreadyExists) {
    throw new CustomError(400, "Invite already exists for this email");
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await Invite.create({
    email,
    role,
    token,
    expiresAt,
  });

  APIResponse.success(res, 201, "Invite created", {
    // inviteLink: `${process.env.FRONTEND_URL}/register?token=${token}`,
    inviteLink: `http://localhost:3000/register?token=${token}`,
  });
});
