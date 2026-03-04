const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  number: { type: String, required: true },
  age: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);