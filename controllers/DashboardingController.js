const Outcome = require("../models/Outcome");

const getOutcomesSum = async (req, res) => {
  try {
    const { id } = req.params;

    // Query outcomes where the owner field matches the provided user ID
    const outcomes = await Outcome.find({ owner: id });
    if (!outcomes || outcomes.length === 0) {
      return res.status(404).json({ error: "No outcomes found for this user" });
    }

    // Calculate the sum of all outcome values
    const sum = outcomes.reduce((total, outcome) => total + outcome.value, 0);

    // Return only the sum in the response
    res.status(200).json(sum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getOutcomesSum,
};
