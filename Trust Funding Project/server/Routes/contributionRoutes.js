// routes/contributionRoutes.js

const express = require("express");
const { addContribution, getContributionsByDonor, getAllContributions } = require("../Controllers/contributionController.js");

const router = express.Router();

// Route to add a new contribution for a specific donor
router.post("/add-contribution/:donorId", addContribution);

// Route to get all contributions for a specific donor
router.get("/:donorId", getContributionsByDonor);

router.get('/', getAllContributions);

module.exports = router;

