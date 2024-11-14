const Contact = require('../Models/ContactModel');

// Post a contact inquiry
exports.postContact = async (req, res) => {
  try {
    const { name, email, message, dateSent } = req.body;
    const newContact = new Contact({ name, email, message, dateSent });
    await newContact.save();
    res.status(201).json({ message: 'Contact inquiry submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit contact inquiry', error });
  }
};

// Get all contact inquiries
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contacts', error });
  }
};

// Get a single contact inquiry by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contact', error });
  }
};
