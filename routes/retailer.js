const express = require("express");
const router = express.Router();
const controller = require("../controller/retailer");

//======================================================
router.get("/", controller.getRetailer);
router.post("/", controller.postRetailer);

//---------------------------------------------------
module.exports = router;
