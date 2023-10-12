const mongoose=require("mongoose");

// product schema
const productSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true
  },
  brand:{
    type:String,
    required:true,
  },
  category:{
    type:String,
    ref:"Category",
    required:true,
  },
  sizes:{
    type:[String],
    enum:["S","M","L","XL","XXL"],
    required:true
  },
  colors:{
    type:[String],
    required:true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
  },
  images:[
    {
      type:String,
      default:"https://via.placeholder.com/150",
    },
  ],
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review",
    }
  ],
  price:{
    type:Number,
    required:true,
  },
  totalQty:{
    type:Number,
    required:true,
  },
  totalSold:{
    type:Number,
    required:true,
    default:0,
  }
},{
  timestamps:true,
  toJSON:{virtuals:true},
});

//vituals
//total rating
productSchema.virtual('totalReviews').get(function(){
  const product=this
  return product?.reviews.length;
})

// average rating
productSchema.virtual("averageRating").get(function(){
  let ratingToal=0;
  const product=this
  product?.reviews?.forEach((review=>{
    // ratingToal+=review?.rating
  }));
  
  // const averageRating=ratingToal/product?.reviews.length;
  // return averageRating;
})

const Product=mongoose.model("Product",productSchema);
module.exports=Product;