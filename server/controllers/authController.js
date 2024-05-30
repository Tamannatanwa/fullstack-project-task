const bcrypt = require("bcrypt");
const User = require("../model/user");
const generateOTP = require("../utils/otpGenerator");
const sendOTP = require("../utils/mailer");

const otpCache = {};

// Register User (Step 1: Send OTP)
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.query().findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Generate and send OTP
  const otp = generateOTP();
  otpCache[email] = { otp, username, password };

  try {
    await sendOTP(email, otp);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
};

// Verify OTP (Step 2: Complete Registration)
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const cachedData = otpCache[email];

  if (!cachedData) {
    return res.status(400).json({ message: "Email not found" });
  }

  if (cachedData.otp === otp.trim()) {
    const { username, password } = cachedData;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await User.query().insert({
        username,
        email,
        password: hashedPassword,
      });

      delete otpCache[email];
      return res.status(201).json({ message: "User registered successfully", userId: newUser.id });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};
