const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User",
    },
    medicines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
      },
    ],
    total_amount:{
      type:Number,
      required:true,
    },
    payment_status:{
      type:String,
      default:"paid"
    },
    delivery_status:{
      type:String,
      default:"pending"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
