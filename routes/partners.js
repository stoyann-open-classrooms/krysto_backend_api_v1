const express = require("express");
// get controller function
const {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  deletePartner,
  getPartnersInRadius,
  partnerPhotoUpload,
} = require("../controllers/partners");

const router = express.Router();
const {protect} = require("../middlewares/auth")

const Partner = require('../models/Partner')
const advancedResults = require('../middlewares/advancedResults')

// Includes other ressource routers
const requestRouter = require('./requests')
const collectRouter = require('./collects')


// Re-route into other ressource router  
router.use('/:partnerId/requests', requestRouter)
router.use('/:partnerId/collects', collectRouter)

router.route("/radius/:zipcode/:distance").get(getPartnersInRadius);
router.route("/").get(advancedResults(Partner), getPartners).post( protect , createPartner);
router.route("/:id").get(getPartner).put(protect, updatePartner).delete(protect, deletePartner);
router.route('/:id/photo').put( protect, partnerPhotoUpload)

module.exports = router;
