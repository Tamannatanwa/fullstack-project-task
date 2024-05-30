
const express = require("express");
const { registerUser, verifyOTP } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/verifyOTP", verifyOTP);

module.exports = router;
