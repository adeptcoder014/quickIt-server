const express = require("express");
const router = express.Router();
const controller = require("../controller/user");

//======================================================
router.get("/", controller.getUser);
router.post("/login", controller.login);
router.post("/register", controller.register);
//---------------------------------------------------
module.exports = router;
