const express = require("express");
// get controller function
const { getArticle, createArticle, getArticles, deleteArticle, updateArticle } = require("../controllers/articles");


const Article = require('../models/Article')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router();


router.route("/").get(advancedResults(Article), getArticles).post(createArticle);
router.route("/:id").get(getArticle).put(updateArticle).delete(deleteArticle);

module.exports = router;
