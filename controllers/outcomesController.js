const Outcome = require("../models/Outcome");

const createOutcome = async (req, res) => {
  try {
    const name = req.body.outcome;
    console.log(res.body);
    const { userId } = req.params; // Assuming the user ID is passed in the request parameters

    // Check if the name already exists for this user
    const existingOutcome = await Outcome.findOne({ name, owner: userId });

    // If the name already exists for this user, return an error response
    if (existingOutcome) {
      return res
        .status(400)
        .json({ error: "Outcome with this name already exists for this user" });
    }

    // Create a new Outcome instance
    const newOutcome = new Outcome({
      name: name,
      owner: userId, // Assign the user ID to the owner field
    });

    // Save the new outcome to the database
    await newOutcome.save();

    // Return success response
    res
      .status(201)
      .json({ message: "Outcome created successfully", outcome: newOutcome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllOutcomes = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming userId is passed in the request params

    // Query outcomes where the owner field matches the provided user ID
    const outcomes = await Outcome.find({ owner: userId });

    if (!outcomes || outcomes.length === 0) {
      return res.status(404).json({ error: "No outcomes found for this user" });
    }

    res.status(200).json(outcomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOutcome = async (req, res) => {
  try {
    const { id } = req.params;
    const outcome = await Outcome.findById(id);
    if (!outcome) {
      return res.status(404).json({ error: "Outcome not found" });
    }
    res.status(200).json(outcome);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOutcome = async (req, res) => {
  try {
    const { id } = req.params;
    await Outcome.findByIdAndDelete(id);
    res.status(200).json({ message: "Outcome deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteSuggestion = async (req, res) => {
  try {
    const { id, index } = req.params;
    const outcome = await Outcome.findById(id);
    if (!outcome) {
      return res.status(404).json({ error: "Outcome not found" });
    }
    outcome.suggestions.splice(index, 1);
    await outcome.save();
    res.status(200).json({ message: "Suggestion deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const increaseOutcome = async (req, res) => {
  try {
    const { id } = req.params;
    const { increaseValue } = req.body;
    const outcome = await Outcome.findById(id);
    if (!outcome) {
      return res.status(404).json({ error: "Outcome not found" });
    }
    outcome.value += Number(increaseValue);
    await outcome.save();
    res.status(200).json({ message: "Outcome value increased successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const decreaseOutcome = async (req, res) => {
  try {
    const { id } = req.params;
    const { increaseValue } = req.body;
    const outcome = await Outcome.findById(id);
    if (!outcome) {
      return res.status(404).json({ error: "Outcome not found" });
    }
    if (outcome.value - increaseValue < 0) {
      res.status(402).json({ error: "value can not be negative" });
    }
    outcome.value -= Number(increaseValue);
    await outcome.save();
    res.status(200).json({ message: "Outcome value decreased successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const outcome = await Outcome.findById(id);
    if (!outcome) {
      return res.status(404).json({ error: "Outcome not found" });
    }
    outcome.suggestions.push(value);
    await outcome.save();
    res.status(200).json({ message: "Suggestion added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllOutcomes,
  getOutcome,
  deleteOutcome,
  deleteSuggestion,
  increaseOutcome,
  decreaseOutcome,
  addSuggestion,
  createOutcome,
};
