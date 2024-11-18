const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const donorRoutes = require("./Routes/donorRoutes");
const trusteeRoutes = require("./Routes/trusteeRoutes");
const userRoutes = require("./Routes/superUserRoutes.js");
const contactRoutes = require('./Routes/contactRoutes');
const contributionRoutes = require("./Routes/contributionRoutes.js");
const User = require('./Models/SuperUserModel.js');
const Trustee = require('./Models/TrusteeModel.js'); // Assuming you have a Trustee model
const Donor = require('./Models/DonorModel.js');   
  // Assuming you have a Donor model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb+srv://abhideep255:abhinav123@cluster01.7b8ly.mongodb.net/Trust_Site_Management")
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Routes
app.use('/trustees', trusteeRoutes); 
app.use('/donors', donorRoutes); 
app.use('/superusers', userRoutes);
app.use("/contributions", contributionRoutes);
app.use('/contact', contactRoutes);


// Login route
// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = await Trustee.findOne({ email });
            if (user) user.role = 'Trustee'; // Tag role as Trustee if found here
        }

        if (!user) {
            user = await Donor.findOne({ email });
            if (user) user.role = 'Donor'; // Tag role as Donor if found here
        }

        // If user is still not found after checking all collections
        if (!user) {
            return res.status(400).json({ message: "Invalid email or user not found" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate a token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send token and role back to the client
        res.json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/forgot-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Search for the user in all collections
        let user = await User.findOne({ email });

        if (!user) {
            user = await Trustee.findOne({ email });
        }

        if (!user) {
            user = await Donor.findOne({ email });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found with the provided email." });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password has been updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while updating the password." });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
