const ErrorResponse = require('../utils/errorResponse')
const Partner = require("../models/Partner");

//@description:     Get all partners
//@ route:          GET /krysto/api/v1/partners
//@access:          Public
exports.getPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find();
    res.status(200).json({ success: true, count: partners.length, data: partners });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@description:     Get a single partner
//@ route:          GET /krysto/api/v1/partners/:id
//@access:          Public
exports.getPartner = async (req, res, next) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return next(new ErrorResponse(`Partner not found with ID of ${req.params.id}`, 404))
     
    }
    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    next(error)
  }
};

//@description:     Create a partner
//@ route:          POST /krysto/api/v1/partners
//@access:          Private
exports.createPartner = async (req, res, next) => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json({
      success: true,
      data: partner,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@description:     Update a partner
//@ route:          PUT /krysto/api/v1/partners/:id
//@access:          Private
exports.updatePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!partner) {
      return next(new ErrorResponse(`Partner not found with ID of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@description:     Delete a partner
//@ route:          DELETE /krysto/api/v1/partners/:id
//@access:          Private
exports.deletePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) {
      return next(new ErrorResponse(`Partner not found with ID of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
