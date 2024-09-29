const express = require('express');
const router = express.Router();

const { loginUser, registerUser, logout } = require('../controllers/authController'); 

// Define the routes
router.post("/register", registerUser);   // For user registration
router.post('/login', loginUser);         // For user login
router.get('/logout', logout);            // For user logout

module.exports = router;









// // Define the login route
// router.get('/login', (req, res) => {
//     res.render('login'); // Render your login view
// });

// // Define the registration route
// router.get('/register', (req, res) => {
//     res.render('register'); // Render your registration view
// });

// router.get('/logout', (req, res) => {
//     res.render('logout'); // Render your registration view
// });
// // Handle login POST request
// router.post('/login', loginUser);

// // Handle registration POST request
// router.post('/register', registerUser);


// router.get('/logout',logout);

// module.exports = router;
