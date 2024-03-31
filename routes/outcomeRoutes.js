const express = require("express");
const { createOutcome, getAllOutcomes, getOutcome, increaseOutcome, deleteOutcome, deleteSuggestion, decreaseOutcome, addSuggestion } = require("../controllers/outcomesController");

const router = express.Router();

// Define routes for Outcome model
router.post("/", createOutcome); // Create a new outcome
router.get("/", getAllOutcomes); // Get all outcomes
router.get("/:id", getOutcome); // Get a specific outcome by ID
router.put("/:id/increase", increaseOutcome); // Increase the value of an outcome by ID
router.put("/:id/decrease", decreaseOutcome); // Decrease the value of an outcome by ID
router.delete("/:id", deleteOutcome); // Delete an outcome by ID
router.delete("/:id/suggestions/:index", deleteSuggestion); // Delete a suggestion from an outcome by ID and suggestion index
router.post("/:id/suggestions", addSuggestion); // Add a suggestion to an outcome by ID

module.exports = router;
