const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Collect = require("../models/Collect");
const Partner = require("../models/Partner");
const Plastic_type = require("../models/Plastic_type");
const Request = require("../models/Request");

//@description:     Get collects
//@ route:          GET /krysto/api/v1/collects
//@ route:          GET /krysto/api/v1/collects/:partnerId/collects
//@access:          Public

exports.getCollects = asyncHandler(async (req, res, next) => {

  res.status(200).status(200).json(res.advancedResults);
});

//@description:     Get single collect
//@ route:          GET /krysto/api/v1/collects/:id
//@access:          Public

exports.getCollect = asyncHandler(async (req, res, next) => {
  const collect = await Collect.findById(req.params.id).populate({
    path: "partner",
    select: "name, description, email, phone, location",
  });

  if (!collect) {
    return next(
      new ErrorResponse(`No collect found with the id of ${req.params.id}`),
      404
    );
  }
  res.status(200).json({
    success: true,
    data: collect,
  });
});

//@description:     Add collect
//@ route:          POST /krysto/api/v1/partners/:partnerId/collects/
//@access:          Private

exports.addCollect = asyncHandler(async (req, res, next) => {
  req.body.partner = req.params.partnerId;
 

  const partner = await Partner.findById(req.params.partnerId);
  

  if (!partner) {
    return next(
      new ErrorResponse(`No partner with the id of ${req.params.partnerId}`),
      404
    );
  }

  const collect = await Collect.create(req.body);

  res.status(200).json({
    success: true,
    data: collect,
  });
});

//@description:     Update collect
//@ route:          PUT /krysto/api/v1/collects/:id
//@access:          Private

exports.updateCollect = asyncHandler(async (req, res, next) => {


  let collect = await Collect.findById(req.params.id);

  if (!collect) {
    return next(
      new ErrorResponse(`No collect with the id of ${req.params.id}`),
      404
    );
  }
  
  collect = await Collect.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    data: collect,
  });
});
//@description:     Delete collect
//@ route:          DELETE /krysto/api/v1/collects/:id
//@access:          Private

exports.deleteCollect = asyncHandler(async (req, res, next) => {


  const collect = await Collect.findById(req.params.id);

  if (!collect) {
    return next(
      new ErrorResponse(`No collect with the id of ${req.params.id}`),
      404
    );
  }
  await collect.remove

  res.status(200).json({
    success: true,
    data: {},
  });
});

