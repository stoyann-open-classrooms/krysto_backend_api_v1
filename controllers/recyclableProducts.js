const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Collect = require("../models/Collect");
const Partner = require("../models/Partner");
const RecyclableProduct = require("../models/Recyclable_product");
const Plastic_type = require("../models/Plastic_type");

//@description:     Get recyclable products
//@ route:          GET /krysto/api/v1/recyclableProducts
//@ route:          GET /krysto/api/v1/partners/:partnerId/recyclableProducts
//@ route:          GET /krysto/api/v1/plasticTypes/:plasticTypeId/recyclableProducts
//@access:          Public

exports.getRecyclableProsducts = asyncHandler(async (req, res, next) => {
  if (req.params.partnerId) {
    const recyclableProducts = await RecyclableProduct.find({
      partner: req.params.partnerId,
    });
    return res.status(200).json({
      success: true,
      count: recyclableProducts.length,
      data: recyclableProducts,
    });
  } else if (req.params.plasticTypeId) {
    const recyclableProducts = await Plastic_type.find({
      plastycType: req.params.plasticTypeId,
    });
    return res.status(200).json({
      success: true,
      count: recyclableProducts.length,
      data: recyclableProducts,
    });
  } else {
    res.status(200).status(200).json(res.advancedResults);
  }
});

//@description:     Get single recyclable product
//@ route:          GET /krysto/api/v1/recyclableProducts/:id
//@access:          Public

exports.getRecyclableProduct = asyncHandler(async (req, res, next) => {
  const recyclableProduct = await RecyclableProduct.findById(
    req.params.id
  ).populate({
    path: "partner",
    select: "name, description, email, phone, location",
  });

  if (!recyclableProduct) {
    return next(
      new ErrorResponse(
        `No recyclable product found with the id of ${req.params.id}`
      ),
      404
    );
  }
  res.status(200).json({
    success: true,
    data: recyclableProduct,
  });
});

//@description:     Add recyclable product
//@ route:          POST /krysto/api/v1/recyclableProducts
//@ route:          POST /krysto/api/v1/partners/:partnerId/recyclableProducts/
//@access:          Private

exports.addRecyclableProducts = asyncHandler(async (req, res, next) => {
  if (req.body.partner) {
    req.body.partner = req.params.partnerId;

    const partner = await Partner.findById(req.params.partnerId);

    if (!partner) {
      return next(
        new ErrorResponse(`No partner with the id of ${req.params.partnerId}`),
        404
      );
    }
    const recyclableProduct = await RecyclableProduct.create(req.body);

    res.status(200).json({
      success: true,
      data: recyclableProduct,
    });
  } else {
    const recyclableProduct = await RecyclableProduct.create(req.body);

    res.status(200).json({
      success: true,
      data: recyclableProduct,
    });
  }

  const recyclableProduct = await Collect.create(req.body);

  res.status(200).json({
    success: true,
    data: recyclableProduct,
  });
});

//@description:     Update recyclable product
//@ route:          PUT /krysto/api/v1/recyclableProducts/:id
//@access:          Private

exports.updateRecyclableProduct = asyncHandler(async (req, res, next) => {
  let recyclableProduct = await RecyclableProduct.findById(req.params.id);

  if (!recyclableProduct) {
    return next(
      new ErrorResponse(`No recyclable product with the id of ${req.params.id}`),
      404
    );
  }

    recyclableProduct = await RecyclableProduct.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: recyclableProduct,
  });
});
//@description:     Delete recyclable product
//@ route:          DELETE /krysto/api/v1/recyclableProducts/:id
//@access:          Private

exports.deleteRecyclableProducts = asyncHandler(async (req, res, next) => {
  const recyclableProduct = await RecyclableProduct.findById(req.params.id);

  if (!recyclableProduct) {
    return next(
      new ErrorResponse(`No recyclable product with the id of ${req.params.id}`),
      404
    );
  }
  await recyclableProduct.remove;

  res.status(200).json({
    success: true,
    data: {},
  });
});
