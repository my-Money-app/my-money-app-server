const express = require("express");
const { getOutcomesSum } = require("../controllers/DashboardingController");
const router = express.Router();
router.get("/sum/:id", getOutcomesSum); 
module.exports = router;
