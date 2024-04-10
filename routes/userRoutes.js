const express = require("express");
const {
  register,
  login,
  uploadProfileImage,
  changePassword,
  CodeVerification,
  resendCode,
  getUserById,
} = require("../controllers/UserController");
const router = express.Router();

// Define routes for User model
router.post("/register", register); // Create a new user
router.post("/login", login); // login user
router.get("/get-user", getUserById);
router.post("/uploadProfileImage", uploadProfileImage);
router.put("/changepwd", changePassword);
router.post("/verifyUser", CodeVerification);
router.post("/resendcode", resendCode);

module.exports = router;
