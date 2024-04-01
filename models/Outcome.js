const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for Outcome
const outcomeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: 0,
  },
  suggestions: [{
    type: Number,
  }], // Array of numbers
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  }
});

// Create model for Outcome using the defined schema
const Outcome = mongoose.model("Outcome", outcomeSchema);

module.exports = Outcome;
