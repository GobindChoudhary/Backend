const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  userController,
} = require("../controllers/auth.controller");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user", userController);

module.exports = router;
