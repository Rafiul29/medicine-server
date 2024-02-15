// external import
const asyncHandler = require("express-async-handler");

// internal import
const Order = require("../models/orders.model");
const User = require("../models/user.Model");

//@ access Public/all
const createOrder = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, city, address, medicines,total_amount } = req.body;

  if (!name || !email || !phoneNumber || !city || !address) {
    throw new Error("All fill must be filled");
  }
  const user = await User.findById({ _id: req.userAuthId });
  // create a new order
  const order = await Order.create({
    name,
    email,
    phoneNumber,
    city,
    address,
    total_amount,
    user: req.userAuthId,
  });
  
  // order model midicines id push
  medicines &&
    medicines?.map((medicine) => order?.medicines?.push(medicine._id));
  // save to the order model
  await order.save();

  // update  user model
  user.orders.push(order?._id);
  await user.save();

  res.json({
    status: "success",
    message: "orders created successfully",
    order,
  });
});

//@ access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find({}).populate("medicines user");

  res.json({
    status: "success",
    message: "orders fetched successfully",
    allOrders,
  });
});

//@ access Public/authenticate user
const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.userAuthId;
  const userOrders = await Order.find({ user: req.userAuthId }).populate(
    "user medicines"
  );

  res.json({
    status: "success",
    message: "order fetch successfully",
    userOrders,
  });
});

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
};
