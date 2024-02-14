//external import
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv.config();

// internal import
const dbConnect = require("./config/dbConnect");
const usersRouter = require("./routes/users.route");
const medicineRouter = require("./routes/medicines.Routes");
const categoriesRouter = require("./routes/categories.Router.js");
const ordersRoutes =require("./routes/orders.routes.js");

const reviewRouter = require("./routes/review.Routes");
const {
  globalErrorHandler,
  notFound,
} = require("./middlewares/globalErrorHandler");


// express app
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// bypass url
app.use("/api/users", usersRouter);
app.use("/api/medicines", medicineRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders",ordersRoutes)
app.use("/api/reviews", reviewRouter);


// not found
app.use(notFound);
// error middleware
app.use(globalErrorHandler);

// database conection
dbConnect();

//listen server
const PORT = process.env.PORT || 4000;
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
