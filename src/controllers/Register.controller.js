const bcrypt = require("bcryptjs");
const Invite = require("../models/invite.model");
const User = require("../models/user.model");
const { APIResponse } = require("../utilities/APIResponse");
const { AsyncHandler } = require("../utilities/AsyncHandler");
const { CustomError } = require("../utilities/CustomError");

exports.RegisterViaInvite = AsyncHandler(async (req, res) => {
  const { token, email, name, password } = req.body;

  //  Validate input
  if (!token || !email || !name || !password) {
    throw new CustomError(400, "All fields are required");
  }

  //  Find invite
  const invite = await Invite.findOne({ token });

  if (!invite) {
    throw new CustomError(400, "Invalid invite token");
  }

  //  Email must match invite email
  if (invite.email !== email.toLowerCase()) {
    throw new CustomError(400, "Email does not match invite");
  }

  // Check expiration
  if (invite.expiresAt < new Date()) {
    throw new CustomError(400, "Invite has expired");
  }

  //  Check usage
  if (invite.acceptedAt) {
    throw new CustomError(400, "Invite already used");
  }

  //  Check existing user
  const existingUser = await User.findOne({ email: invite.email });
  if (existingUser) {
    throw new CustomError(400, "User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user (email & role from invite)
  await User.create({
    name,
    email: invite.email,
    password: hashedPassword,
    role: invite.role,
    invitedAt: new Date(),
  });

  //  Mark invite as used
  invite.acceptedAt = new Date();
  await invite.save();

  APIResponse.success(res, 201, "Registration successful. Please login.");
});
