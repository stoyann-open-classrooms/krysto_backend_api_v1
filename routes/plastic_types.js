const express = require("express");
// get controller function
const { getPlasticTypes, getPlasticType, createPlasticType, updatePlasticType, deletePlasticType } = require("../controllers/plastic_types");

const {protect , authorize} = require("../middlewares/auth")
const Plastic_type = require('../models/Plastic_type')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router();





router.route("/").get(advancedResults(Plastic_type), getPlasticTypes).post( protect, createPlasticType)
router.route("/:id").get(getPlasticType).put( protect , updatePlasticType).delete( protect,  deletePlasticType)

module.exports = router;
