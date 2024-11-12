const Trustee = require("../Models/TrusteeModel");
const bcrypt = require("bcryptjs");

// Get all trustees
exports.getTrustees = async (req, res) => {
  try {
    const trustees = await Trustee.find();
    res.status(200).json({ success: true, data: trustees });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single trustee
exports.getTrusteeById = async (req, res) => {
  try {
    const trustee = await Trustee.findById(req.params.id);
    if (!trustee) {
      return res.status(404).json({ success: false, message: "Trustee not found" });
    }
    res.status(200).json({ trustee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a trustee
exports.createTrustee = async (req, res) => {
  const { name, email, password, phone, address = "", city = "" } = req.body;

  // Validate incoming data
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ success: false, error: "Name, email, password, and phone are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newTrustee = await Trustee.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
    });
    res.status(201).json({ success: true, data: newTrustee });
  } catch (error) {
    console.error("Error creating trustee:", error); // Log the error for debugging
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update trustee
exports.updateTrustee = async (req, res) => {
  const { name, email, phone, address, city } = req.body;

  try {
    const updatedTrustee = await Trustee.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, city, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedTrustee) {
      return res.status(404).json({ success: false, message: "Trustee not found" });
    }
    res.status(200).json({ success: true, data: updatedTrustee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete trustee
exports.deleteTrustee = async (req, res) => {
  try {
    const trustee = await Trustee.findByIdAndDelete(req.params.id);
    if (!trustee) {
      return res.status(404).json({ success: false, message: "Trustee not found" });
    }
    res.status(200).json({ success: true, message: "Trustee deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
