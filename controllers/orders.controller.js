// external import
const asyncHandler = require("express-async-handler");

// internal import
const Category = require("../models/category.model");
const Order = require("../models/orders.model");

// @desc create new category
//@route POST /api/categories
//@ access Privet/Admin

const createOrder = asyncHandler(async (req, res) => {
  const { name } = req.body;
  // category exists
  const categoryFound = await Order.findOne({ name });
  console.log(categoryFound);

  if (categoryFound) {
    throw new Error("Category already exists1");
  }

  // create
  const category = await Category.create({
    name,
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "Category created successfully",
    category,
  });
});

// @desc get all categories
//@route GET /api/categories
//@ access Public

const getAllOrders = asyncHandler(async (req, res) => {
  const categories = await Order.find({});

  res.json({
    status: "success",
    message: "Category fetched successfully",
    categories,
  });
});

// @desc get single categories
//@route GET /api/categories/:id
//@ access Public

const getUserOrders = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Order.findById({ _id: id });

  res.json({
    status: "success",
    message: "Category fetch successfully",
    category,
  });
});

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
};
