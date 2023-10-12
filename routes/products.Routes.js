// external import
const express=require('express');

// internal import
const isloggedIn=require("../middlewares/isLoggedIn")
const {createProduct,getAllProducts,getSingleProduct,updateSigleProduct,deleteSigleProduct}=require("../controllers/products.Controller")
//router
const router=express.Router();


// create a new product
router.post("/",isloggedIn,createProduct);

// get all products
router.get("/",getAllProducts);

// get single product
router.get("/:id",getSingleProduct)

// update single product
router.put("/:id",isloggedIn,updateSigleProduct);

//delete single product
router.delete("/:id",isloggedIn,deleteSigleProduct);

module.exports=router