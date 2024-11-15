const express = require("express");
const router = express.Router();
const donorController = require("../Controllers/donorController");

// Define routes for donors
// console.log(donorController); 
router.get("/", donorController.getDonors);
router.get("/:id", donorController.getDonorById);
router.post("/", donorController.createDonor);
router.put("/:id", donorController.updateDonor);
router.delete("/:id", donorController.deleteDonor);
router.post("/login", donorController.loginDonor);
router.post("/show-password/:id", donorController.getDonorPassword);  // Corrected function name

module.exports = router ;
 