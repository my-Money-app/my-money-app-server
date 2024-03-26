const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliveryPersonSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true, default: "123456" },
  cin: { type: String, required: true },
  address: { type: String },
  img: { type: String },
  verificationCode: { type: String, required: false },
  verified: { type: Boolean, required: false, default: false },
  vehicleType: { type: String, required: true }, // Adding a field for vehicle type
  deliveryHistory: [{ type: Schema.Types.ObjectId, ref: "Delivery" }], // Assuming a reference to Delivery model
});

const DeliveryPerson = mongoose.model("DeliveryPerson", deliveryPersonSchema);

module.exports = DeliveryPerson;
