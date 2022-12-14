const express = require("express");
// get controller function
const { getArticle, createArticle, getArticles, deleteArticle, updateArticle, articlePhotoUpload } = require("../controllers/articles");
const {protect, authorize} = require('../middlewares/auth')

// Include other resource routers

const reviewRouter = require('./reviews');
const router = express.Router();


const Article = require('../models/Article')
const advancedResults = require('../middlewares/advancedResults')
// Re-route into other resource routers
router.use('/:articleId/reviews', reviewRouter);


router.route("/").get(advancedResults(Article), getArticles).post( protect, createArticle);
router.route("/:id").get(getArticle).put( protect, updateArticle).delete( protect, deleteArticle);
router.route('/:id/photo').put( protect , articlePhotoUpload)
module.exports = router;
