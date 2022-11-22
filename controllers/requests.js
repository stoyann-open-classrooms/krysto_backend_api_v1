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
  req.body.user = req.user.id;

  const partner = await Partner.findById(req.params.partnerId);

  if (!partner) {
    return next(
      new ErrorResponse(`No partner with the id of ${req.params.partnerId}`),
      404
    );
  }

  // Make sure user is partner owner
  if (partner.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `user ${req.user.id} is not authorized to add a request to partner ${partner._id}`,
        401
      )
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


  
  // Make sure user is request owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `user ${req.user.id} is not authorized to  update request ${request_id}`,
        401
      )
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

  // Make sure user is request owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `user ${req.user.id} is not authorized to delete request ${request_id}`,
        401
      )
    );
  }

  await request.remove;

  res.status(200).json({
    success: true,
    data: {},
  });
});
