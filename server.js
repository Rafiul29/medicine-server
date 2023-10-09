//external import
const express=require('express')
const dotenv =require('dotenv');
const cors=require('cors')
const morgan=require("morgan");
const mongoose=require('mongoose')
dotenv.config()


// internal import
const dbConnect=require("./config/dbConnect")
const userRouter=require("./routes/user.route")
// const productRouter=require("./routes/productRoutes")


// express app
const app=express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(morgan("dev"));



// bypass url
app.use("/api/users",userRouter)




// database conection
dbConnect();

//listen server
const PORT=process.env.PORT || 4000
app.listen(PORT,(req, res) => {
    console.log(`server is running on port ${PORT}`);
});