const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

// Auth Middleware: Check if token exists and is valid
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                success: false,
                msg: "Access denied. Please Sign In Again."
            });
        }

        const user = await jwt.verify(token, process.env.JWT_SECRET);
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Token might have expired! Please sign in again!"
            });
        }

        req.user = user; // Store user info in request
        next(); // Proceed to next middleware/route handler
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occurred while authenticating the user!"
        });
    }
};

// User Role Middleware: Check if the authenticated user is a regular user
const isUser = async (req, res, next) => {
    try {
        const token = req.user;
        if (!token) {
            return res.status(400).json({
                success: false,
                msg: "Token might have expired! Please sign in again!"
            });
        }

        if (token.role !== "User") {
            return res.status(400).json({
                success: false,
                msg: "This is not a User"
            });
        }

        next(); // Proceed if the user is valid
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occurred while verifying the user!"
        });
    }
};

// Admin Role Middleware: Check if the authenticated user is an admin
const isAdmin = async (req, res, next) => {
    try {
        const token = req.user;
        if (!token) {
            return res.status(400).json({
                success: false,
                msg: "Token might have expired! Please sign in again!"
            });
        }

        if (token.role !== "Admin") {
            return res.status(400).json({
                success: false,
                msg: "This is not an Admin"
            });
        }

        // No need to send a response in middleware, just call next()
        next(); // Proceed if the user is an Admin
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occurred while verifying admin!"
        });
    }
};

module.exports = { auth, isUser, isAdmin };
