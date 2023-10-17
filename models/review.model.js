const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: [true, "Review must belong to a user"],
    },
    message: {
      type: String,
      required: [true, "Review must belong to a user"],
    },
    rating: {
      type: Number,
      required: [true, "Review must belong to a user"],
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const Review=mongoose.model("Review",reviewSchema);

module.exports=Review;