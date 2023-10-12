const User = require("../models/user.Model")

const isAdmin=async(req,res,next)=>{
  // find the login user
  const user=await User.findById(req.userAuthId);
  console.log(user)
  // check if admin
  if(user.isAdmin){
    next();
  }else{
    next(new Error("Access denied admin only"))
  }
}

module.exports=isAdmin;