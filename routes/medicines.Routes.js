// external import
const express=require('express');

// internal import
const {createMedicine,getAllMedicines,getSingleMedicine,updateSingleMedicine,deleteSingleMedicine}=require("../controllers/medicine.controller")
const isloggedIn=require("../middlewares/isLoggedIn")
const isAdmin=require("../middlewares/isAdmin")
//router
const router=express.Router();

// create a new Medicine
router.post("/",isloggedIn,isAdmin,createMedicine);

// get all Medicines
router.get("/", getAllMedicines);

// get single Medicine
router.get("/:id",getSingleMedicine)

// update single Medicine
router.put("/:id",isloggedIn,isAdmin,updateSingleMedicine);

//delete single Medicine
router.delete("/:id",isloggedIn,isAdmin, deleteSingleMedicine);

module.exports=router