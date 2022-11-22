const express = require("express");
// get controller function
const { getRequests, getRequest, addRequest, updateRequest, deleteRequest } = require("../controllers/requests");

const Request = require('../models/Request')
const advancedResults = require('../middlewares/advancedResults')


const router = express.Router({mergeParams: true});
const {protect} = require("../middlewares/auth")




router.route('/').get(advancedResults(Request, 'partner'), getRequests).post(addRequest)
router.route('/:id').get(getRequest).put( updateRequest).delete( deleteRequest)


module.exports = router;
