const express = require("express");
const { getAllUsers } = require("../controllers/DashboardingController");
const router = express.Router();
router.get("/users", getAllUsers); // Get all users
module.exports = router;
