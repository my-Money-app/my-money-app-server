const mongoose = require("mongoose");

// Define the schema for the pharmacy
const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  nutrationalValue: {
    type: String,
    required: false,
  },
  howToUse: String,
  WhyUsing: String,
  cantUse: String,
  category:String,
  image:String,
  isFavorite : Boolean,
  price:String,  
});

// Create the Pharmacy model using the schema
const Medicine = mongoose.model("medicine", medicineSchema);

module.exports = Medicine;
