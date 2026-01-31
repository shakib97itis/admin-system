const express = require("express");
const router = express.Router();
const {
  RegisterViaInvite,
  Login,
  changeUserRole,
  changeUserStatus,
  getAllUsers,
} = require("../../controllers/user.controllers");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { roleMiddleware } = require("../../middlewares/role.middleware");

router.route("/register-via-invite").post(RegisterViaInvite);
router.route("/login").post(Login);
router
  .route("/change-role/:userId")
  .patch(authMiddleware, roleMiddleware("ADMIN"), changeUserRole);
router
  .route("/change-status/:id")
  .patch(authMiddleware, roleMiddleware("ADMIN"), changeUserStatus);
router
  .route("/users")
  .get(authMiddleware, roleMiddleware("ADMIN"), getAllUsers);

module.exports = router;
