const {
  createPharmacy,
  getAllPharmacies,
  getPharmacyById,
  updatePharmacyById,
  deletePharmacyById,
} = require("../controllers/pharmacyController.js");
const express = require("express");
const router = express.Router();

// Define routes
router.post("/", createPharmacy);
router.get("/", getAllPharmacies);
router.get("/:id", getPharmacyById);
router.put("/:id", updatePharmacyById);
router.delete("/:id", deletePharmacyById);

module.exports = router;
