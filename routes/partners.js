const express = require("express");
// get controller function
const {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  deletePartner,
  getPartnersInRadius,
} = require("../controllers/partners");

// Includes other ressource routers
const requestRouter = require('./requests')
const collectRouter = require('./collects')
const router = express.Router();

// Re-route into other ressource router  
router.use('/:partnerId/requests', requestRouter)
router.use('/:partnerId/collects', collectRouter)

router.route("/radius/:zipcode/:distance").get(getPartnersInRadius);
router.route("/").get( getPartners).post(createPartner);
router.route("/:id").get(getPartner).put(updatePartner).delete(deletePartner);

module.exports = router;
