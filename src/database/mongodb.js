const mongoose = require("mongoose");

const dbConnection = () => {
    try {
        mongoose.connect(
            process.env.MONGODB_CN, 
            {}
        );
        console.log("Online Database");
    } catch (error) {
        throw new Error("An error occurred during database initialization");
    }
};

module.exports = dbConnection;