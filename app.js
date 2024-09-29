const express = require('express');
const app = express();
const connectDB = require('./config/mongoose-connection');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const turfRoutes = require('./routes/turf');
const indexRouter=require('./routes/index')
const expressSession = require("express-session");


const path = require('path'); // Required for serving static files
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set views directory

// Serve static files (like Tailwind CSS)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Database connection
// connectDB();

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)




// Routes
app.use('/auth', authRoutes);
app.use('/turf', turfRoutes);
app.use('/',indexRouter);

// Set PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
