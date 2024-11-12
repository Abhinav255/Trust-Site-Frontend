const express = require("express");
const router = express.Router();
const donorController = require("../Controllers/donorController");

// Define routes for donors
router.get("/", donorController.getDonors);
router.get("/:id", donorController.getDonorById);
router.post("/", donorController.createDonor);
router.put("/:id", donorController.updateDonor);
router.delete("/:id", donorController.deleteDonor);
router.post("/login", donorController.loginDonor);

module.exports = router;
