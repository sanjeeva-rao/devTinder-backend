const mongoose = require("mongoose");

const createDatabse = async () => {
    const connectionString = process.env.connectionString;
    await mongoose.connect(connectionString);
}

module.exports = {createDatabse};