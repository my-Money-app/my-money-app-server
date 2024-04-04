const express = require("express");
const {
  getOutcomesSum,
  getOutcomesValueForCurrentWeek,
  getOutcomesValueForCurrentMonth,
  getOutcomesValuePerDay,
} = require("../controllers/DashboardingController");
const verifyToken = require("../middleWares/jerifyToken");
const router = express.Router();
router.get("/sum/:id", verifyToken, getOutcomesSum);
router.get("/sum-for-week/:id", verifyToken, getOutcomesValueForCurrentWeek);
router.get("/sum-for-month/:id", verifyToken, getOutcomesValueForCurrentMonth);
router.get("/perday/:id", verifyToken, getOutcomesValuePerDay);


module.exports = router;
