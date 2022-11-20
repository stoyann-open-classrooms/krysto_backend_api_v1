const express = require("express");
const router = express.Router()


//get all partners
router.get("/", (req, res) => {
    res
      .status(200)
      .json({ success: true, message: `show all partners` });
  });
  
  // get partners by id
  router.get("/:id", (req, res) => {
      res
        .status(200)
        .json({ success: true, message: `get a partner by id ${req.params.id}` });
    });
  
  // create new partner
  router.post("/", (req, res) => {
    res
      .status(200)
      .json({ success: true, message: `Create new partners` });
  });
  
  // update partner by id
  
  router.put("/:id", (req, res) => {
    res
      .status(200)
      .json({ success: true, message: `Update parteners ${req.params.id}` });
  });
  
  
  // Delete partner by id
  router.delete("/:id", (req, res) => {
    res
      .status(200)
      .json({ success: true, message: `Delete partners ${req.params.id}` });
  });
  
  

  module.exports = router;
  
  