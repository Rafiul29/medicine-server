// external import
const express = require("express");

// internal import
const {
  createOrder,
  getAllOrders,
  getUserOrders,
} = require("../controllers/orders.controller");
const isloggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
//router
const router = express.Router();

// create a new order
router.post("/", isloggedIn, createOrder);

//login an user
router.get("/all", isloggedIn, isAdmin, getAllOrders);

// user profile
router.get("/user", isloggedIn, getUserOrders);

module.exports = router;
