const express = require("express");
// get controller function
const { getPlasticTypes, getPlasticType, createPlasticType, updatePlasticType, deletePlasticType } = require("../controllers/plastic_types");


const Plastic_type = require('../models/Plastic_type')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router();




router.route("/").get(advancedResults(Plastic_type), getPlasticTypes).post(createPlasticType)
router.route("/:id").get(getPlasticType).put(updatePlasticType).delete(deletePlasticType)

module.exports = router;
