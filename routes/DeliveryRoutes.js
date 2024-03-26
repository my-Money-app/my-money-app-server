const express = require("express");
const {
  getAllDeliveries,
  createDeliveryPerson,
  getAllDeliveryPeople,
  createDelivery,
} = require("../controllers/deliveryController");
const router = express.Router();

router.get("/", getAllDeliveries);
router.get("/deliveryPeople", getAllDeliveryPeople);
router.post("/createDeliveryPerson", createDeliveryPerson);
router.post("/createDelivery", createDelivery);


module.exports = router;
