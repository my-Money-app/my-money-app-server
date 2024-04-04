const express = require("express");
const {
  getOutcomesSum,
  getOutcomesValueForCurrentWeek,
  getOutcomesValueForCurrentMonth,
  getOutcomesValuePerDay,
  getCustomOutcomesValuePerDay,
} = require("../controllers/DashboardingController");
const verifyToken = require("../middleWares/jerifyToken");
const router = express.Router();
router.get("/sum/:id", verifyToken, getOutcomesSum);
router.get("/sum-for-week/:id", verifyToken, getOutcomesValueForCurrentWeek);
router.get("/sum-for-month/:id", verifyToken, getOutcomesValueForCurrentMonth);
router.get("/perday/:id", verifyToken, getOutcomesValuePerDay);
// router.get("/Customperday/:id", verifyToken, getCustomOutcomesValuePerDay);



module.exports = router;
