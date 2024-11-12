// controllers/contributionController.js

const Contribution = require("../Models/contributionModel.js");
const Donor = require("../Models/DonorModel.js");

// Add a new contribution for a specific donor
const addContribution = async (req, res) => {
  const { donorId } = req.params; // Get donorId from route parameter
  const { amount, date, collectedBy } = req.body;
  // console.log("Received donorId:", donorId);

  try {
    // Check if the donor exists
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // Create a new contribution
    const newContribution = new Contribution({
      donorId,
      amount,
      date,
      collectedBy,
    });

    await newContribution.save();
    res.status(201).json({ message: "Contribution added successfully", contribution: newContribution });
  } catch (error) {
    console.error("Error adding contribution:", error);
    res.status(500).json({ message: "Error adding contribution", error });
  }
};

// Get all contributions and match with donors
const getAllContributions = async (req, res) => {
  try {
    // Fetch all contributions
    const contributions = await Contribution.find();

    // Fetch all donors
    const donors = await Donor.find();

    // Create a mapping of donor IDs to donor names
    const donorMap = donors.reduce((map, donor) => {
      map[donor._id] = donor.name; // Assuming donor has a 'name' field
      return map;
    }, {});

    // Match contributions with donor names
    const contributionsWithDonorNames = contributions.map(contribution => ({
      ...contribution._doc,
      donorName: donorMap[contribution.donorId] || 'Unknown Donor',
    }));

    res.status(200).json(contributionsWithDonorNames);
  } catch (error) {
    console.error("Error fetching all contributions:", error);
    res.status(500).json({ message: "Error fetching contributions", error });
  }
};


// Get all contributions for a specific donor
const getContributionsByDonor = async (req, res) => {
  const { donorId } = req.params; // Get donorId from route parameter

  try {
    // Fetch contributions for the specific donor
    const contributions = await Contribution.find({ donorId });
    res.status(200).json(contributions);
  } catch (error) {
    console.error("Error fetching contributions:", error);
    res.status(500).json({ message: "Error fetching contributions", error });
  }
};

module.exports = {
  addContribution,
  getContributionsByDonor,
  getAllContributions, // Export the new function
};