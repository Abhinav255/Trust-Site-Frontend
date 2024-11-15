const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Make this required
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  role: {
    type: String,
    default: "donor", // Set default role
  },
  date:{
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Donor", DonorSchema);
