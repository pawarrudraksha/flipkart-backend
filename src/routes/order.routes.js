const express = require("express");
const router = express.Router();
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");
const { newOrder } = require("../controllers/orderController");

router.route("/order/new").post(isUserAuthenticated, newOrder);
module.exports = router;
