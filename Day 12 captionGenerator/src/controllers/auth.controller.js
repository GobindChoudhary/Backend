const userModel = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { userName, password } = req.body;

  const isUserExist = userModel.findOne({ userName });

  if (isUserExist) {
    return res.status(401).json({
      message: `User with userName ${userName} already exist`,
    });
  }

  const newUser = await userModel.create({
    userName,
    password,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_URL);
  res.cookie("token", token);
  res.status(201).json({
    message: "user created",
    newUser,
  });
}

function loginController(req, res) {}

function userController(req, res) {}

module.exports = { registerController, loginController, userController };
