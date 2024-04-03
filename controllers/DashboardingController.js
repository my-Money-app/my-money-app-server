const moment = require("moment");
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
const getOutcomesSumForCurrentWeek = async (req, res) => {
  try {
    const { id } = req.params;

    // Calculate the start and end dates of the current week
    const startOfWeek = moment().startOf("week");
    const endOfWeek = moment().endOf("week");

    // Query outcomes updated within the current week for the specified user
    const outcomes = await Outcome.find({
      owner: id,
      // Assuming there's another date field in your schema to track updates, replace 'updatedDate' with the appropriate field
      updatedDate: { $gte: startOfWeek, $lte: endOfWeek },
    });

    if (!outcomes || outcomes.length === 0) {
      return res
        .status(404)
        .json({ error: "No outcomes found for this user this week" });
    }

    // Calculate the sum of all outcome values for the current week
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
  getOutcomesSumForCurrentWeek,
};
