const userModel = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerController(req, res) {
  const { userName, password } = req.body;

  const isUserExist = await userModel.findOne({ userName });

  if (isUserExist) {
    return res.status(401).json({
      message: `User with userName ${userName} already exist`,
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    userName,
    password: hashPassword,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_URL);
  res.cookie("token", token);
  res.status(201).json({
    message: "user created",
    newUser,
  });
}

async function loginController(req, res) {
  const { userName, password } = req.body;

  const user = await userModel.findOne({ userName });

  if (!user) {
    return res.status(401).json({
      message: `user with name ${userName} doesn't exist`,
    });
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_URL);
  res.cookie("token", token);
  res.status(200).json({
    message: "Loggedin successfully",
    user,
  });
}

async function userController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unautherised access",
    });
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET_URL);

  if (!decoded) {
    return res.status(401).json({
      message: "Unautherised access",
    });
  }

  const user = await userModel
    .findOne({ _id: decoded.id })
    .select("-password -__v");
  res.status(200).json({
    message: "Details fetched successfully",
    user,
  });
}

module.exports = { registerController, loginController, userController };
