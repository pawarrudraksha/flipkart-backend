const router = require("express").Router();
const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(getAllProducts);
router
  .route("/admin/products/new")
  .post(isUserAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/admin/products/:id")
  .put(isUserAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isUserAuthenticated, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isUserAuthenticated, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isUserAuthenticated, deleteReview);

module.exports = router;
