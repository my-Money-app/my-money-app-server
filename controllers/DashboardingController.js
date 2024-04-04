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
const getOutcomesValueForCurrentWeek = async (req, res) => {
  try {
    const { id } = req.params;
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Set to first day of the week

    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay())); // Set to last day of the week

    const outcomes = await Outcome.find({ owner: id });

    if (!outcomes || outcomes.length === 0) {
      return res.status(404).json({ error: "No outcomes found for this user" });
    }

    let totalValueForWeek = 0;

    // Aggregate value history for each outcome within the current week
    for (const outcome of outcomes) {
      for (const entry of outcome.valueHistory) {
        if (entry.date >= startOfWeek && entry.date <= endOfWeek) {
          totalValueForWeek += entry.value;
        }
      }
    }

    res.status(200).json({ totalValueForWeek });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOutcomesValueForCurrentMonth = async (req, res) => {
  try {
    const { id } = req.params;
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const outcomes = await Outcome.find({ owner: id });

    if (!outcomes || outcomes.length === 0) {
      return res.status(404).json({ error: "No outcomes found for this user" });
    }

    let totalValueForMonth = 0;

    for (const outcome of outcomes) {
      for (const entry of outcome.valueHistory) {
        if (entry.date >= startOfMonth && entry.date <= endOfMonth) {
          totalValueForMonth += entry.value;
        }
      }
    }

    res.status(200).json(totalValueForMonth);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getOutcomesValuePerDay = async (req, res) => {
  try {
    const { id } = req.params;
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );

    const outcomes = await Outcome.find({ owner: id });

    if (!outcomes || outcomes.length === 0) {
      return res.status(404).json({ error: "No outcomes found for this user" });
    }

    let outcomeValuesPerDay = {};

    // Iterate through each outcome
    for (const outcome of outcomes) {
      let outcomeValues = {};

      // Initialize outcomeValues object with zero values for each day
      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfDay);
        day.setDate(day.getDate() + i);
        outcomeValues[day.toISOString().split("T")[0]] = 0;
      }

      // Aggregate value history for the outcome per day
      for (const entry of outcome.valueHistory) {
        const entryDate = new Date(entry.date);
        if (entryDate >= startOfDay && entryDate < endOfDay) {
          const day = entryDate.toISOString().split("T")[0];
          outcomeValues[day] += entry.value;
        }
      }

      // Add the outcome's values per day to the main object
      outcomeValuesPerDay[outcome.name] = outcomeValues;
    }

    res.status(200).json(outcomeValuesPerDay);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getOutcomesSum,
  getOutcomesValueForCurrentWeek,
  getOutcomesValueForCurrentMonth,
  getOutcomesValuePerDay,
};
