const User = require("../models/user.Model");
const validator = require("validator");
const bcrypt = require("bcrypt");
const asyncHander=require("express-async-handler");
const { generateToken } = require("../utils/generateToken");
const { getTokenFromHeader } = require("../utils/getTokenFromHeader");
const {verifyToken}=require("../utils/verifyToken")

const registerUser = asyncHander(async (req, res) => {

    const { fullname, email, password } = req.body;

    if(!fullname||!email||!password){
      throw new Error("Must fill name, email and password")
    }

    //check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      // throw
      throw new Error("User already exists");
    }
    if (!validator.isEmail(email)) {
      throw new Error("invalid email");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error(
        "Password must 8+ charm contains uppercase lowercase, number and special char"
      );
    }
    // salt
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    // create the user
    const user = await User.create({
      fullname,
      email,
      password: hash,
    });
    res.status(201).json({
      status: "success",
      message: "User registered Successfully",
      data: user,
    });
 
})

const loginUser = asyncHander(async (req, res) => {
 
    const {email,password}=req.body;

    if(!email || !password){
      throw new Error("Must  fill email and password")
    }

// find the user in db by email only
    const userFound=await User.findOne({email})

    if(!userFound){
      throw new Error("Incorrect email or password");
    }

    const match=await bcrypt.compare(password,userFound.password);

    if(!match){
      throw new Error("Incorrect email or password");
    }

    res.status(201).json({
      status: "success",
      message: "User login Successfully",
      userFound,
      token:generateToken(userFound?._id)
    })
})


const getUserProfile=asyncHander(async(req,res)=>{

console.log(req.userAuthId)

  res.json({
    msg:"Welcome to profile page"
  })
})


module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
