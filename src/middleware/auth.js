const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isUserAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ message: "Please login to access this resource" });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(401).json({
          message: `Role:${req.user.role} is not allowed to access this resource`,
        })
      );
    }
    next();
  };
};
module.exports = {
  isUserAuthenticated,
  authorizeRoles,
};
