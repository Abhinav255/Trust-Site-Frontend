const express = require('express');
const router = express.Router();
const superUserController = require('../Controllers/superUserController');

// Define the routes
router.post('/', superUserController.registerUser); // Register a new user
router.get('/', superUserController.getUsers); // Get all users
router.put('/:id', superUserController.updateUser); // Update a user
router.delete('/:id', superUserController.deleteUser); // Delete a user

module.exports = router;
