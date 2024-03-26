const Delivery = require("../models/Delivery");
const DeliveryPerson = require("../models/DeliveryPerson");

//delivery person
const createDeliveryPerson = async (req, res) => {
  try {
    // Extract delivery person data from the request body
    const { fullName, email, phoneNumber, cin, address, vehicleType } =
      req.body;

    // Check if any field is empty
    const isAnyFieldEmpty = [
      fullName,
      email,
      phoneNumber,
      address,
      cin,
      vehicleType,
    ].some((value) => !value);
    if (isAnyFieldEmpty) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    // Check if the delivery person with the same email already exists
    const existingDeliveryPerson = await DeliveryPerson.findOne({ email });
    if (existingDeliveryPerson) {
      return res
        .status(409)
        .json({ error: "Delivery person with the same email already exists" });
    }
    // Check if the ID is a valid 8-digit number
    const isValidId = /^(0|1)\d{7}$/.test(cin);
    if (!isValidId) {
      return res.status(400).json({
        error: "ID should be a valid 8-digit number starting with 0 or 1",
      });
    }
    // Create a new delivery person instance
    const newDeliveryPerson = new DeliveryPerson({
      cin,
      fullName,
      email,
      phoneNumber,
      address,
      verificationCode: null,
      verified: false,
      vehicleType,
      deliveryHistory: [],
    });

    // Save the new delivery person to the database
    await newDeliveryPerson.save();

    // Return the newly created delivery person
    res.status(201).json({
      deliveryPerson: newDeliveryPerson,
      message: "Delivery person added successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllDeliveries = async (req, res) => {
  try {
    // Retrieve all deliveries from the database
    const deliveries = await Delivery.find({}); // This will fetch all deliveries in the collection

    // Check if there are no deliveries found
    if (!deliveries || deliveries.length === 0) {
      return res.status(404).json({ error: "No deliveries found" });
    }

    // Return the list of deliveries
    res.status(200).json(deliveries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createDelivery = async (req, res) => {
  try {
    // Extract delivery data from the request body
    const {
      items,
      deliveryPerson,
      fromPharmacy,
      requestedBy,
      deliveryAddress,
      deliveryCost,
    } = req.body;

    // Create a new delivery instance
    const newDelivery = new Delivery({
      items,
      deliveryPerson,
      fromPharmacy,
      requestedBy,
      deliveryAddress,
      deliveryCost,
    });

    // Save the new delivery to the database
    await newDelivery.save();

    // Return the newly created delivery
    res.status(201).json({ delivery: newDelivery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get delivery people
const getAllDeliveryPeople = async (req, res) => {
  try {
    // Retrieve all delivery people from the database
    const deliveryPeople = await DeliveryPerson.find({});

    // Check if there are no delivery people found
    if (!deliveryPeople || deliveryPeople.length === 0) {
      return res.status(404).json({ error: "No delivery people found" });
    }

    // Return the list of delivery people
    res.status(200).json({ deliveryPeople });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllDeliveries,
  createDelivery,
  createDeliveryPerson,
  getAllDeliveryPeople,
};
