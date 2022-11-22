const express = require("express");
// get controller function
const {
  getCollects,
  getCollect,
  addCollect,
  updateCollect,
  deleteCollect,
} = require("../controllers/collects");
const router = express.Router({ mergeParams: true });

const {protect, authorize} = require('../middlewares/auth')

const Collect = require("../models/Collect");
const advancedResults = require("../middlewares/advancedResults");

router
  .route("/")
  .get(
    advancedResults(Collect, {
      path: "partner",
      select: "name, description, email, phone, location",
    }),
    getCollects
  )
  .post( protect, addCollect);
router.route("/:id").get(getCollect).put(protect, updateCollect).delete( protect, deleteCollect);

module.exports = router;
