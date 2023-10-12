// external import
const asyncHandler = require("express-async-handler");

// internal import
const Product = require("../models/product.model");
const Category = require("../models/category.model");

// create a new product
// @route POST /api/products/
//access privet/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;

  // productExists
  const productExists = await Product.findOne({ name });

  if (productExists) {
    throw new Error("Product Already Exists");
  }

  
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
  });
  // push the prodcut into category
  // find the category
  const categoryFound=await Category.findOne({
    name:category,
  })

  if(!categoryFound){
    throw new Error("Category not found, please create category first ir check category name")
  }

  // push the product the category
  categoryFound.products.push(product._id);
  // resave
  await categoryFound.save();
  // create the product
  
  // send response
  res.json({
    status: "success",
    message: "Product created successfully",
    product,
  });
});

//get all products
// @route GET /api/products/
//access public
const getAllProducts = asyncHandler(async (req, res) => {
  // query
  let productQuery = Product.find();

  // search by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }

  // filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }

  // filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  // filter by colors
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }

  // filter by sizes
  if (req.query.size) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.size, $options: "i" },
    });
  }
  // filter by price range
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    console.log(priceRange);
    //  gte:grether or equal
    //  lte: less or equal
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  // pagination
  // page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;

  // limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

  // startindex
  const startIndex = (page - 1) * limit;

  //endIndex
  const endIndex = page * limit;
  // total
  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startIndex).limit(limit);

  // pagination results
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
    };
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
  }

  // await the query
  const products = await productQuery

  res.json({
    status: "success",
    total,
    pagination,
    result: products.length,
    message: "Products fetch successfully",
    products,
  });
});

//@desc get single product
// @route GET /api/products/:id
//access public
const getSingleProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById({ _id: id })
  if (!product) {
    throw new Error("Product not found");
  }

  res.json({
    status: "success",
    message: "Product fetched successfully",
    product,
  });
});

//@desc update single product
// @route PUT /api/products/:id
//access privet/Admin
const updateSingleProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;
  const id = req.params.id;
  // update
  const product = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      description,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
      brand,
    },
    { new: true }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  res.json({
    status: "success",
    message: "Product updated successfully",
    product,
  });
});


//@desc delete single product
// @route DELETE /api/products/:id
//access privet/Admin
const deleteSingleProduct=asyncHandler(async(req,res)=>{
  const id = req.params.id;
  console.log(id)
    const product=await Product.findByIdAndDelete({_id:id});

    res.json({
      status: "success",
      message: "Product deleted successfully",
      product,
    });
})

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct
};
