const express = require("express");
const {
  getOutcomesSum,
  getOutcomesValueForCurrentWeek,
  getOutcomesValueForCurrentMonth,
  getCustomOutcomesValuePerDay,
  getOutcomesForCurrentMonth,
} = require("../controllers/DashboardingController");
const verifyToken = require("../middleWares/jerifyToken");
const router = express.Router();
router.get("/sum/:id", verifyToken, getOutcomesSum);
router.get("/sum-for-week/:id", verifyToken, getOutcomesValueForCurrentWeek);
router.get("/sum-for-month/:id", verifyToken, getOutcomesValueForCurrentMonth);
router.get("/permonth/:id", verifyToken, getOutcomesForCurrentMonth);
router.get("/Customperday/:id", verifyToken, getCustomOutcomesValuePerDay);



module.exports = router;
