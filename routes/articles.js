const express = require("express");
// get controller function
const { getArticle, createArticle, getArticles, deleteArticle, updateArticle } = require("../controllers/articles");
const {protect, authorize} = require('../middlewares/auth')
const router = express.Router();


const Article = require('../models/Article')
const advancedResults = require('../middlewares/advancedResults')



router.route("/").get(advancedResults(Article), getArticles).post( protect, createArticle);
router.route("/:id").get(getArticle).put( protect, updateArticle).delete( protect, deleteArticle);

module.exports = router;
