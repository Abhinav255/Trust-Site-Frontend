const express = require('express');
const router = express.Router();
const ContactController = require('../Controllers/contactController');

router.post('/', ContactController.postContact);       // Create a new contact inquiry
router.get('/', ContactController.getAllContacts);     // Retrieve all contact inquiries
router.get('/:id', ContactController.getContactById); // Retrieve a specific contact inquiry by ID

module.exports = router;
