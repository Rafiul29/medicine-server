const mongoose=require("mongoose");

// Medicine schema
const medicineSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true
  },
  category:{
    type:String,
    ref:"Category",
    required:true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
  },
  images:
    {
      type:String,
      required:true,
    },
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
  price:{
    type:Number,
    required:true,
  },
  countInStock:{
    type:Number,
    required:true,
  }
},{
  timestamps:true,
  toJSON:{virtuals:true}, 
});

// virtuals
// total rating
medicineSchema.virtual('totalReviews').get(function(){
  const medicine=this;
  return medicine?.reviews?.length;
})

medicineSchema.virtual("averageRating").get(function(){
  let ratingTotal=0
  const medicine=this;
  medicine?.reviews?.forEach((review)=>{
    ratingTotal+=review.rating;
  })
  // calc average rating
  return ratingTotal/medicine?.reviews?.length;
})

const Medicine=mongoose.model("Medicine",medicineSchema);
module.exports=Medicine;