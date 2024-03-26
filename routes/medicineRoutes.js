const express = require("express");
const {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicineById,
  deleteMedicineById,
  toggleFavoriteStatus,
} = require("../controllers/medicineColtroller");
const router = express.Router();

// Define routes for Medicine model
router.post("/", createMedicine); // Create a new medicine
router.get("/", getAllMedicines); // Get all medicines
router.get("/:id", getMedicineById); // Get a specific medicine by ID
router.put("/:id", updateMedicineById); // Update a medicine by ID
router.delete("/:id", deleteMedicineById); // Delete a medicine by ID
router.put("/:id/toggleFavorite", toggleFavoriteStatus); // Toggle favorite status of a medicine by ID

module.exports = router;
