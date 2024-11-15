const Donor = require("../Models/DonorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// Get all donors
exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json({ success: true, data: donors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Refactored getDonorPassword function
exports.getDonorPassword = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ success: false, message: "Donor not found" });
    }
    res.status(200).json({ success: true, data: donor });
    console.log(donor.password)
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ success: false, message: "Donor not found" });
    }
    res.status(200).json({ success: true, data: donor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.loginDonor = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Email and password are required" });
  }

  try {
    // Find donor by email
    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(404).json({ success: false, message: "Donor not found" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token (optional, for future authentication)
    const token = jwt.sign({ id: donor._id, role: donor.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send response with token and donor data
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      donor: {
        id: donor._id, // Include the donor ID here
        name: donor.name,
        email: donor.email,
        role: donor.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Create a donor
exports.createDonor = async (req, res) => {
  const { name, email, password, phone, address = "", city = "", contributionAmount = 0, collector = "" , date} = req.body;

  // Validate incoming data
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ success: false, error: "Name, email, password, and phone are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDonor = await Donor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      // contributionAmount,
      // collector,
      date,
    });
    res.status(201).json({ success: true, data: newDonor });
  } catch (error) {
    console.error("Error creating donor:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update donor
exports.updateDonor = async (req, res) => {
  const { name, email, phone, address, city, contributionAmount, collector } = req.body;

  try {
    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, city, 
        // contributionAmount,
        //  collector, 
         updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedDonor) {
      return res.status(404).json({ success: false, message: "Donor not found" });
    }
    res.status(200).json({ success: true, data: updatedDonor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete donor
exports.deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(404).json({ success: false, message: "Donor not found" });
    }
    res.status(200).json({ success: true, message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
