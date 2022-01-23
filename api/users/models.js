const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {  type: Number,  required: true },
  firstName: {  type: String,  required: true }, 
  lastName: {  type: String,  required: true },
  phoneNumber: {  type: String,  required: true },
  emailAddress: { type: String,  required: true, trim: true, unique: true, lowercase: true  },
  createdAt: { type: Date, default: Date.now  }
}, {timestamps: true});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
