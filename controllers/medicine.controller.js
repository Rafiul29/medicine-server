// external import
const asyncHandler = require("express-async-handler");

// internal import
const Medicine = require("../models/medicine.model");
const Category = require("../models/category.model");

// create a new Medicine
// @route POST /api/Medicines/
//access privet/Admin
const createMedicine = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    images,
    price,
    countInStock,
  } = req.body;

  // MedicineExists
  const medicineExists = await Medicine.findOne({ name });

  if (medicineExists) {
    throw new Error("Medicine Already Exists");
  }

  
  const medicine = await Medicine.create({
    name,
    description,
    category,
    user:req.userAuthId,
    images,
    price,
    countInStock,
  });
console.log(req.userAuthId)
  // push the prodcut into category
  // find the category
  const categoryFound=await Category.findOne({
    name:category,
  })

  if(!categoryFound){
    throw new Error("Category not found, please create category first ir check category name")
  }

  // push the Medicine the category
  categoryFound.medicines.push(medicine._id);
  // resave
  await categoryFound.save();
  // create the Medicine
  
  // send response
  res.json({
    status: "success",
    message: "Medicine created successfully",
    medicine,
  });
});

//get all Medicines
// @route GET /api/Medicines/
//access public
const getAllMedicines = asyncHandler(async (req, res) => {
  try{
    // query
  let medicineQuery = Medicine.find();


  // search by name
  if (req.query.name) {
    medicineQuery = medicineQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }


  // filter by category
  if (req.query.category) {
    medicineQuery = medicineQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }
  
  // await the query
  const medicines = await medicineQuery

  res.json({
    status: "success",
    result: medicines.length,
    message: "Medicines fetch successfully",
    medicines,
  });

  }catch(err){
    res.json({message:err.message})
  }
});

//@desc get single Medicine
// @route GET /api/Medicines/:id
//access public
const getSingleMedicine = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const medicine = await Medicine.findById({ _id: id }).populate("reviews")
  if (!medicine) {
    throw new Error("Medicine not found");
  }

  res.json({
    status: "success",
    message: "Medicine fetched successfully",
    medicine,
  });
});

//@desc update single Medicine
// @route PUT /api/Medicines/:id
//access privet/Admin
const updateSingleMedicine = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    images,
    price,
    countInStock,
  } = req.body;
  const id = req.params.id;
  console.log(id)
  // update
  const medicine = await Medicine.findByIdAndUpdate(
    { _id: id },
    {
    name,
    description,
    category,
    images,
    price,
    countInStock,
    },
    { new: true }
  );

  if (!medicine) {
    throw new Error("Medicine not found");
  }

  res.json({
    status: "success",
    message: "Medicine updated successfully",
    medicine,
  });
});


//@desc delete single Medicine
// @route DELETE /api/Medicines/:id
//access privet/Admin
const deleteSingleMedicine=asyncHandler(async(req,res)=>{
  const id = req.params.id;

    const medicine=await Medicine.findByIdAndDelete({_id:id});

    res.json({
      status: "success",
      message: "Medicine deleted successfully",
      medicine,
    });
})

module.exports = {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
  updateSingleMedicine,
  deleteSingleMedicine
};
