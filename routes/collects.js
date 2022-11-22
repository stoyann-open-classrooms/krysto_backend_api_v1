const express = require("express");
// get controller function
const {
  getCollects,
  getCollect,
  addCollect,
  updateCollect,
  deleteCollect,
} = require("../controllers/collects");

const Collect = require("../models/Collect");
const advancedResults = require("../middlewares/advancedResults");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(Collect, {
      path: "partner",
      select: "name, description, email, phone, location",
    }),
    getCollects
  )
  .post(addCollect);
router.route("/:id").get(getCollect).put(updateCollect).delete(deleteCollect);

module.exports = router;
