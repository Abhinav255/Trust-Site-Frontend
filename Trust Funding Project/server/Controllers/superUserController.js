
const User = require('../Models/SuperUserModel'); // Adjust the path if necessary
const bcrypt = require('bcryptjs');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Register a new user (Admin or Trustee)
exports.registerUser = async (req, res) => {
  const { username, email, password, address, name, phone, city, role } = req.body;
  console.log(req.body)

  // Validate incoming data
  if (!username || !email || !password  || !role) {
    return res.status(400).json({ success: false, error: "Username, email, password, profile, and role are required" });
  }


  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      name,
      address,
      phone,
      city,
    });
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error registering user:", error); // Log the error for debugging
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email,name, address, city,  password , profile, role } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, name, address, city, password: hashedPassword, profile, role, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
