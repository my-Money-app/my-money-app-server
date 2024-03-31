const mongoose = require("mongoose");

// Define the schema for Outcome
const outcomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: 0,
  },
  suggestions: [
    {
      type: Number,
    },
  ], // Array of numbers
});

// Create model for Outcome using the defined schema
const Outcome = mongoose.model("Outcome", outcomeSchema);

module.exports = Outcome;
