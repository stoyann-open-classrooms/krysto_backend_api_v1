const express = require("express");
// get controller function
const { getPlasticTypes, getPlasticType, createPlasticType, updatePlasticType, deletePlasticType } = require("../controllers/plastic_types");




const router = express.Router();




router.route("/").get( getPlasticTypes).post(createPlasticType)
router.route("/:id").get(getPlasticType).put(updatePlasticType).delete(deletePlasticType)

module.exports = router;
