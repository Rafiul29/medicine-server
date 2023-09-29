//external import
const express=require('express')
const dotenv =require('dotenv');
const cors=require('cors')
const morgan=require("morgan");
const mongoose=require('mongoose')
dotenv.config()

// internal import


// express app
const app=express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(morgan("dev"));


app.get("/",(req,res)=>{
  res.status(200).json({message:"Hello shoptronics "})
})

// database configuration
const URI=process.env.MONGO_URI
mongoose.connect(URI,{useNewUrlParser: true})
.then(()=>{
  console.log("connected to database");
})
.catch((err)=>{
  console.log(err);
});

//listen server
const PORT=process.env.PORT || 4000
app.listen(PORT, (req, res) => {
    console.log(`server is running on port ${PORT}`);
});