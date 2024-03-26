const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  image: String,
  deliveries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
    },
  ],
});

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);

module.exports = Pharmacy;
