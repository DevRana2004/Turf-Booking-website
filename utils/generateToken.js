const jwt = require("jsonwebtoken");
const config = require("config");

const generateToken = (user) => {
    // return jwt.sign({ email: user.email, id: user._id }, config.get("JWT_KEY"));
    return jwt.sign({email: user.email, id: user._id},process.env.JWT_KEY)

}

module.exports.generateToken = generateToken;



// return jwt.sign(
//     { email: user.email, id: user._id },
//     process.env.JWT_KEY,
//     { expiresIn: '1h' } // Optional: token expiration time
// );