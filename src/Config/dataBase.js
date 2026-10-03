const mongoose = require("mongoose");

const createDatabse = async () => {
    await mongoose.connect("mongodb+srv://Namastedev:Sanju123456%40@namastenode.px4eb2l.mongodb.net/devTinder");
}

module.exports = {createDatabse};