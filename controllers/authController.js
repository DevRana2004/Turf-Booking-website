const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken");

const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async function (req, res) {
    try {
        const { email, password, username } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(401).send("You already have an account. Please login.");
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let newUser = await User.create({
            password: hash,
            email,
            username
        });

        let token = generateToken(newUser);
        res.cookie("token", token); 
        res.redirect("/dashboard");
    } catch (err) { 
        res.status(400).send(err.message);
    }
};

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect("/login");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch)
         {
            let token = generateToken(user);
            res.cookie("token", token);
            return res.redirect("/dashboard");
        } 
        else 
        {
            req.flash('error', 'Invalid email or password.');
            return res.redirect("/login");
        }
    } catch (err) {
        res.status(400).send('Login failed. Please try again.');
    }
};


module.exports.logout =function(req,res)
{
    res.clearCookie("token","");
    res.redirect("/");
}