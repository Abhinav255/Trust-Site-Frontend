const express = require("express");
const router = express.Router();
const trusteeController = require("../Controllers/trusteeController");

// Define routes for trustees
router.get("/", trusteeController.getTrustees);
router.get("/:id", trusteeController.getTrusteeById);
router.post("/", trusteeController.createTrustee);
router.put("/:id", trusteeController.updateTrustee);
router.delete("/:id", trusteeController.deleteTrustee);

module.exports = router;
