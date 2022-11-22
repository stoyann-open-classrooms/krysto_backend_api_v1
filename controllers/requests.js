const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Request = require("../models/Request");
const Partner = require("../models/Partner");

//@description:     Get requests
//@ route:          GET /krysto/api/v1/requests
//@ route:          GET /krysto/api/v1/partners/:partnerId/requests
//@access:          Public

exports.getRequests = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description:     Get single request
//@ route:          GET /krysto/api/v1/requests/:id
//@access:          Public

exports.getRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id).populate({
    path: "partner",
    select: "name, description, email, phone, location",
  });

  if (!request) {
    return next(
      new ErrorResponse(`No request with the id of ${req.params.id}`),
      404
    );
  }
  res.status(200).json({
    success: true,
    data: request,
  });
});

//@description:     Add request
//@ route:          POST /krysto/api/v1/partners/:partnerId/requests/
//@access:          Private

exports.addRequest = asyncHandler(async (req, res, next) => {
  req.body.partner = req.params.partnerId;

  const partner = await Partner.findById(req.params.partnerId);

  if (!partner) {
    return next(
      new ErrorResponse(`No partner with the id of ${req.params.partnerId}`),
      404
    );
  }
  const request = await Request.create(req.body);

  res.status(200).json({
    success: true,
    data: request,
  });
});

//@description:     Update request
//@ route:          PUT /krysto/api/v1/requests/:id
//@access:          Private

exports.updateRequest = asyncHandler(async (req, res, next) => {
  let request = await Request.findById(req.params.id);

  if (!request) {
    return next(
      new ErrorResponse(`No request with the id of ${req.params.id}`),
      404
    );
  }

  request = await Request.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: request,
  });
});
//@description:     Delete request
//@ route:          DELETE /krysto/api/v1/requests/:id
//@access:          Private

exports.deleteRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id);

  if (!request) {
    return next(
      new ErrorResponse(`No request with the id of ${req.params.id}`),
      404
    );
  }
  await request.remove;

  res.status(200).json({
    success: true,
    data: {},
  });
});
