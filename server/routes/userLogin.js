const express = require("express");
const { loginUser, verifyLoginOTP } = require("../controllers/loginController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/verifyLoginOTP", verifyLoginOTP);

module.exports = router;
