const express = require("express");
const {
  getOutcomesSum,
  getOutcomesSumForCurrentWeek,
} = require("../controllers/DashboardingController");
const verifyToken = require("../middleWares/jerifyToken");
const router = express.Router();
router.get("/sum/:id", verifyToken, getOutcomesSum);
router.get("/sum-for-week/:id", verifyToken, getOutcomesSumForCurrentWeek);
module.exports = router;
