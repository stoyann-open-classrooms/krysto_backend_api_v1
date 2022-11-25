const express = require("express");
// get controller function
const { getRecyclableProsducts, getRecyclableProduct, updateRecyclableProduct, deleteRecyclableProducts, addRecyclableProducts } = require("../controllers/recyclableProducts");
const router = express.Router({ mergeParams: true });
const Recyclable_product = require('../models/Recyclable_product')
const { protect, authorize } = require("../middlewares/auth");

const Plastic_type= require("../models/Plastic_type");
const Partner = require("../models/Partner");
const advancedResults = require("../middlewares/advancedResults");

router
  .route("/")
  .get(
    advancedResults(Recyclable_product),
    getRecyclableProsducts
  )
  .post(protect, addRecyclableProducts);
router
  .route("/:id")
  .get(getRecyclableProduct)
  .put(protect, updateRecyclableProduct)
  .delete(protect, deleteRecyclableProducts);

module.exports = router;
