require('dotenv').config();
const jwt = require('jsonwebtoken');

// Auth Middleware: Verify token and store user data in req.user
const auth = async (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "Access denied. Please sign in again.",
            });
        }

       // console.log("Token received:", token); // Add logging to check the token

        const user = jwt.verify(token, process.env.JWT_SECRET);

     //   console.log("Decoded user:", user); // Log the decoded user

        req.user = user; // Store user info (decoded payload) in req.user

        next(); // Proceed to next middleware/route handler
    } catch (error) {
        console.error("JWT verification error:", error); // Log the error for debugging

        return res.status(401).json({
            success: false,
            msg: "Invalid or expired token. Please sign in again.",
        });
    }
};



// Role Middleware: Validate user's role
const checkRole = (role) => (req, res, next) => {
    try {
        if (req.user.role !== role) {
            return res.status(403).json({
                success: false,
                msg: `Access denied. You must be a ${role} to perform this action.`,
            });
        }
        next(); // Proceed if the user has the required role
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occurred while verifying user role.",
        });
    }
};

// Specific Role Middlewares
const isUser = checkRole("User");
const isAdmin = checkRole("Admin");

module.exports = { auth, isUser, isAdmin };
