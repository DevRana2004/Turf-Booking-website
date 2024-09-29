const express = require('express');
const User = require('../models/user');
const auth = require("../middlewares/auth"); // Authentication middleware
const router = express.Router();

// Home route
router.get('/', (req, res) => {
    res.render('index');
});

// Dashboard route (requires authentication)
router.get('/dashboard', auth, async (req, res) => {
    try {
        // Fetch the authenticated user from the database
        let user = await User.findOne({ email: req.user.email });

        if (!user) {
            req.flash("error", "User not found. Please log in.");
            return res.redirect("/login");
        }

        // Render dashboard with user data
        res.render('dashboard', { user });
    } catch (err) {
        console.error("Error fetching user:", err);
        req.flash("error", "An error occurred while loading the dashboard. Please try again.");
        res.redirect("/login");
    }
});

module.exports = router;
