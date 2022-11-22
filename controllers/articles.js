const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Article = require("../models/Article");

//@description:     Get all articles
//@ route:          GET /krysto/api/v1/articles
//@access:          Public
exports.getArticles = asyncHandler(async (req, res, next) => {
 
  res
    .status(200)
    .json(res.advancedResults);
});

//@description:     Get a single article
//@ route:          GET /krysto/api/v1/articles/:id
//@access:          Public
exports.getArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    return next(
      new ErrorResponse(`Article not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: article });
});

//@description:     Create a article
//@ route:          POST /krysto/api/v1/articles
//@access:          Private
exports.createArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.create(req.body);
  res.status(201).json({
    success: true,
    data: article,
  });
});

//@description:     Update a article
//@ route:          PUT /krysto/api/v1/articles/:id
//@access:          Private
exports.updateArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!article) {
    return next(
      new ErrorResponse(`Article not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: article });
});

//@description:     Delete a article
//@ route:          DELETE /krysto/api/v1/articles/:id
//@access:          Private
exports.deleteArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) {
    return next(
      new ErrorResponse(`Article not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});


