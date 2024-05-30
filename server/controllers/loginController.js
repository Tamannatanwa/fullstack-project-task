const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const generateOTP = require("../utils/otpGenerator");
const sendOTP = require("../utils/mailer");

const otpCache = {};

// Login User (Step 1: Check credentials and send OTP)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.query().findOne({ email });

    // If user does not exist
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // If user exists, check the password
    const validPassword = await bcrypt.compare(password, user.password);

    // If password is not valid
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate and send OTP
    const otp = generateOTP();
    otpCache[email] = { otp, userId: user.id };

    try {
      await sendOTP(email, otp);
      res.json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res
        .status(500)
        .json({ message: "Error sending OTP", error: error.message });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Verify OTP for Login (Step 2: Complete Login)
exports.verifyLoginOTP = async (req, res) => {
  const { email, otp } = req.body;
  const cachedData = otpCache[email];

  if (!cachedData) {
    return res.status(400).json({ message: "Email not found" });
  }

  if (cachedData.otp === otp.trim()) {
    const { userId } = cachedData;

    // Generate JWT token

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Clear OTP cache
    delete otpCache[email];

    // Send the token and userId as response
    res
      .status(200)
      .json({ message: "OTP verified successfully", token, userId });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};
