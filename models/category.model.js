const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    default: "https://picsum.photos/200/300",
    required: true,
  },
  medicines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
    },
  ],
},{timestamps:true});

const Category=mongoose.model("Category",categorySchema);
module.exports=Category;
