const express = require("express");
// get controller function
const { getCollects, getCollect, addCollect, updateCollect, deleteCollect } = require("../controllers/collects");

const router = express.Router({mergeParams: true});


router.route('/').get(getCollects).post(addCollect)
router.route('/:id').get(getCollect).put(updateCollect).delete(deleteCollect)



module.exports = router;
