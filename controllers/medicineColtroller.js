const Medicine = require("../models/MedicineModel"); // Adjust the path as needed

const createMedicine = async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(500).json({ error: "Error creating medicine" });
  }
};

const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: "Error getting medicines" });
  }
};

const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ error: "Error getting medicine" });
  }
};

const updateMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ error: "Error updating medicine" });
  }
};

const deleteMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndRemove(req.params.id);
    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ error: "Error deleting medicine" });
  }
};

const toggleFavoriteStatus = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    medicine.isFavorite = !medicine.isFavorite;
    await medicine.save();

    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ error: "Error toggling favorite status" });
  }
};

module.exports = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicineById,
  deleteMedicineById,
  toggleFavoriteStatus,
};
