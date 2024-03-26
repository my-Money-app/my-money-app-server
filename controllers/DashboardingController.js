const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({}); // This will fetch all users in the collection

    // Check if there are no users found
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    // Return the list of users
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getAllUsers,
};
