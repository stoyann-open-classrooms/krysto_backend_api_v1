const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const geocoder = require('../utils/geocoder');
const Partner = require("../models/Partner");

//@description:     Get all partners
//@ route:          GET /krysto/api/v1/partners
//@access:          Public
exports.getPartners = asyncHandler(async (req, res, next) => {
  const partners = await Partner.find();
  res
    .status(200)
    .json({ success: true, count: partners.length, data: partners });
});

//@description:     Get a single partner
//@ route:          GET /krysto/api/v1/partners/:id
//@access:          Public
exports.getPartner = asyncHandler(async (req, res, next) => {
  const partner = await Partner.findById(req.params.id);
  if (!partner) {
    return next(
      new ErrorResponse(`Partner not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: partner });
});

//@description:     Create a partner
//@ route:          POST /krysto/api/v1/partners
//@access:          Private
exports.createPartner = asyncHandler(async (req, res, next) => {
  const partner = await Partner.create(req.body);
  res.status(201).json({
    success: true,
    data: partner,
  });
});

//@description:     Update a partner
//@ route:          PUT /krysto/api/v1/partners/:id
//@access:          Private
exports.updatePartner = asyncHandler(async (req, res, next) => {
  const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!partner) {
    return next(
      new ErrorResponse(`Partner not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: partner });
});

//@description:     Delete a partner
//@ route:          DELETE /krysto/api/v1/partners/:id
//@access:          Private
exports.deletePartner = asyncHandler(async (req, res, next) => {
  const partner = await Partner.findByIdAndDelete(req.params.id);
  if (!partner) {
    return next(
      new ErrorResponse(`Partner not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});




// @description      Get partners within a radius
// @route            GET /api/v1/partners/radius/:zipcode/:distance
// @access           Private
exports.getPartnersInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius =  6,378 km
  const radius = distance / 6378;

  const partners = await Partner.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: partners.length,
    data: partners
  });
});