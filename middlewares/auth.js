// const jwt = require("jsonwebtoken");
// const userModel = require("../models/user");
// const config = require('config');

// module.exports = async (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) {
//         req.flash("error", "No token provided. Please log in.");
//         return res.redirect("/login");
//     }

//     try {
//         // const data = jwt.verify(token, config.get("JWT_KEY")); // Use environment variable for secret key    
//         const data = jwt.verify(token, process.env.JWT_KEY || "ashh"); // Use environment variable for secret key   

//         req.user = data; 
//         next(); 
//     } catch (err) {
//         console.error('Token verification error:', err); // Log the error
//         req.flash("error", "Invalid or expired token. Please log in again.");
//         return res.redirect("/login");
//     }
// };

const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async function (req, res, next) {
    const token = req.cookies.token; // Retrieve the token from cookies

    if (!token) {
        req.flash("error", "You must be logged in to view this page.");
        return res.redirect("/login");
    }

    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        
        // Find the user using the decoded token's ID
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            req.flash("error", "User not found. Please log in.");
            return res.redirect("/login");
        }

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Token verification failed:", err);
        req.flash("error", "Invalid token. Please log in again.");
        return res.redirect("/login");
    }
};
