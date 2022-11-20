

//@description:     Get all partners
//@ route:          GET /krysto/api/v1/partners
//@access:          Public 
exports.getPartners = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, message: `show all partners` });
}



//@description:     Get a single partner
//@ route:          GET /krysto/api/v1/partners/:id
//@access:          Public 
exports.getPartner = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, message: `get a partner by id ${req.params.id}` });
}


//@description:     Create a partner
//@ route:          POST /krysto/api/v1/partners
//@access:          Private 
exports.createPartner = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, message: `Create new partner` });
}



//@description:     Update a partner
//@ route:          PUT /krysto/api/v1/partners/:id
//@access:          Private
exports.updatePartner = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, message: `Update parteners ${req.params.id}` });
}


//@description:     Delete a partner
//@ route:          DELETE /krysto/api/v1/partners/:id
//@access:          Private
exports.deletePartner = (req, res, next) => {
    res
    .status(200)
    .json({ success: true, message: `Delete partners ${req.params.id}` });
}