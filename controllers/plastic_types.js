const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Plastic_type = require("../models/Plastic_type");

//@description:     Get all plastic Types
//@ route:          GET /krysto/api/v1/plasticTypes
//@access:          Public
exports.getPlasticTypes = asyncHandler(async (req, res, next) => {
 
  res
    .status(200)
    .json(res.advancedResults);
});

//@description:     Get a single plastic type
//@ route:          GET /krysto/api/v1/plasticType/:id
//@access:          Public
exports.getPlasticType = asyncHandler(async (req, res, next) => {
  const plasticType = await Plastic_type.findById(req.params.id);
  if (!plasticType) {
    return next(
      new ErrorResponse(`Article not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: plasticType });
});

//@description:     Create a plastic type
//@ route:          POST /krysto/api/v1/plasticTypes
//@access:          Private
exports.createPlasticType = asyncHandler(async (req, res, next) => {
  const plastic_type = await Plastic_type.create(req.body);
  res.status(201).json({
    success: true,
    data: plastic_type,
  });
});

//@description:     Update a plastic type
//@ route:          PUT /krysto/api/v1/plasticTypes/:id
//@access:          Private
exports.updatePlasticType = asyncHandler(async (req, res, next) => {
  const plasticType = await Plastic_type.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!plasticType) {
    return next(
      new ErrorResponse(`Plastic type not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: plasticType });
});

//@description:     Delete a plastic type
//@ route:          DELETE /krysto/api/v1/plasticTypes/:id
//@access:          Private
exports.deletePlasticType = asyncHandler(async (req, res, next) => {
  const plasticType = await Plastic_type.findByIdAndDelete(req.params.id);
  if (!plasticType) {
    return next(
      new ErrorResponse(`Plastic type not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});


