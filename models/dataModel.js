const mongoose = require("mongoose");

// Define schema that matches your MongoDB data
const myDataSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    city: String,
    profileImage: { type: String },
    resume: { type: String },
    // Add more fields based on your collection
  },
  { collection: "user" }
); // Use your existing collection name here

module.exports = mongoose.model("usersList", myDataSchema);
