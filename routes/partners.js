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
const {protect , authorize} = require("../middlewares/auth")

const Partner = require('../models/Partner')
const advancedResults = require('../middlewares/advancedResults')

// Includes other ressource routers
const requestRouter = require('./requests')
const collectRouter = require('./collects')


// Re-route into other ressource router  
router.use('/:partnerId/requests', requestRouter)
router.use('/:partnerId/collects', collectRouter)

router.route("/radius/:zipcode/:distance").get(getPartnersInRadius);
router.route("/").get(advancedResults(Partner), getPartners).post( protect ,  authorize('publisher', "admin"), createPartner);
router.route("/:id").get(getPartner).put(protect,  authorize('publisher', "admin"), updatePartner).delete(protect,  authorize('publisher', "admin"), deletePartner);
router.route('/:id/photo').put( protect, authorize('publisher', "admin") , partnerPhotoUpload)

module.exports = router;
