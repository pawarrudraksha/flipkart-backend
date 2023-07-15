const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateRole,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isUserAuthenticated, updatePassword);
router.route("/me").get(isUserAuthenticated, getUserDetails);
router.route("/me/update").put(isUserAuthenticated, updateProfile);
router
  .route("/admin/users")
  .get(isUserAuthenticated, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/users/:id")
  .get(isUserAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isUserAuthenticated, authorizeRoles("admin"), updateRole)
  .delete(isUserAuthenticated, authorizeRoles("admin"), deleteUser);

module.exports = router;
