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

const router = express.Router();

router.route("/radius/:zipcode/:distance").get(getPartnersInRadius);
router.route("/").get(getPartners).post(createPartner);
router.route("/:id").get(getPartner).put(updatePartner).delete(deletePartner);

module.exports = router;
