  // models/Contribution.js

  const mongoose = require("mongoose");

  const ContributionSchema = new mongoose.Schema({
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor", // Reference to the Donor model
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    collectedBy: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  module.exports = mongoose.model("Contribution", ContributionSchema);
