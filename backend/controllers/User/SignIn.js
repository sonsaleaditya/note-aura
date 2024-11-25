const dotenv = require('dotenv').config();
const UserSchema = require('../../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "All fields are mandatory.",
      });
    }

    // Check if user exists
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User does not exist.",
      });
    }

    // Match password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        msg: "Invalid password.",
      });
    }

    // Create payload for token
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      img: user.img,
    };

    // Generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d', // 7 days expiration
    });

    // Cookie options
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiration for cookie
      httpOnly: true, // Prevent JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Secure cookies in production
    };

    // Remove sensitive information
    user.password = undefined;

    // Send response
    return res
      .cookie('token', token, cookieOptions)
      .status(200)
      .json({
        success: true,
        msg: "Successfully signed in.",
        user,
        token,
      });
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    return res.status(500).json({
      success: false,
      msg: "An error occurred while signing in. Please try again later.",
    });
  }
};

module.exports = { signIn };
