const { CustomError } = require("../utilities/CustomError");

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    throw new CustomError(403, "Access denied. Admin only");
  }
  next();
};
