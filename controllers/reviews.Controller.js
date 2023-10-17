const asyncHandler = require("express-async-handler");
const Review = require("../models/review.model");
const Medicine = require("../models/medicine.model");

// create a new product
// @route POST /api/reviews/
// access privet/Admin

const createReview = asyncHandler(async (req, res) => {
  const { medicine, message, rating } = req.body;

  // 1.find the product
  const { productId } = req.params;
  const medicineFound = await Medicine.findById(productId).populate("reviews");

  console.log(medicineFound)
  if (!medicineFound) {
    throw new Error("Product Not found");
  }
  // check if user already reiviewed this product

    const hasReviewed=medicineFound?.reviews?.find((review)=>{
      console.log(String(review?.user))
      return review?.user.toString()==req?.userAuthId.toString()
    })
    
  if(hasReviewed){
    throw new Error("Already reviews")
  }

  // create review
  const review = await Review.create({
    message,
    rating,
    medicine: medicineFound._id,
    user: req.userAuthId,
  });
  
  medicineFound.reviews.push({...review});
  await medicineFound.save();

  res.status(201).json({
    success:true,
    message:"Review create successfully",
  })
  
});

module.exports = {
  createReview,
};
