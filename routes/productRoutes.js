// external import
const express=require('express');

// internal import
const {getAllProducts,getSingleProduct,addProduct}=require("../controllers/productControler")

//router
const router=express.Router();


router.get('/products',getAllProducts);
router.get('/product/:id',getSingleProduct);
router.post('/product',addProduct)


module.exports=router