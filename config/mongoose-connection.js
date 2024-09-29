const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose"); // Setup debugging

// Connect to MongoDB using the URI from the config
mongoose
    .connect(`${config.get("MONGODB_URI")}/TURF_BOOKING`)
    .then(() => {
        dbgr("MongoDB connected successfully"); // Debugging log
    })
    .catch((err) => {
        dbgr(err); // Log any errors
    });

// Export the mongoose connection to share across files
module.exports = mongoose.connection;
