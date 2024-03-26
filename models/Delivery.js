const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Pharmacy = require("./PharmacyModel")
const DeliveryPerson = require("./DeliveryPerson")
const User = require("./User")


const deliverySchema = new Schema({
  items: [{  }], // Array of items being delivered
  deliveryPerson: {
    type: Schema.Types.ObjectId,
    ref: "DeliveryPerson",
    default: null
  }, // Reference to DeliveryPerson model
  fromPharmacy: {
    type: Schema.Types.ObjectId,
    ref: "Pharmacy",
    default: null
  }, // Reference to Pharmacy model
  requestedBy: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User model for the requester
  date: { type: Date, default: Date.now }, // Date of the delivery
  deliveryAddress: { type: String},
  status: {
    type: String,
    enum: ["waitingConfirmation","pending", "delivered", "cancelled"],
    default: "waitingConfirmation", 
  },
  deliveryCost: { type: Number, required: true },
});

// Define a pre-save hook for the Delivery model
deliverySchema.pre("save", async function (next) {
  const delivery = this;

  try {
    // Update the Pharmacy model when a new Delivery is created
    await Pharmacy.updateOne(
      { _id: delivery.fromPharmacy },
      { $push: { deliveries: delivery._id } }
    );

    // Update the DeliveryPerson model when a new Delivery is created
    await DeliveryPerson.updateOne(
      { _id: delivery.deliveryPerson },
      { $push: { deliveryHistory: delivery._id } }
    );

    // Update the User model when a new Delivery is created
    await User.updateOne(
      { _id: delivery.requestedBy },
      { $push: { deliveries: delivery._id } }
    );

    next();
  } catch (error) {
    next(error);
  }
});

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
