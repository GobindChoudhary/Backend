const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { userName, password } = req.body;

  const isUserExist = await userModel.findOne({ userName });
  if (isUserExist) {
    return res.status(409).json({
      message: "user already exist",
    });
  }

  const user = await userModel.create({
    userName,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "User creater successfully",
    user,
  });
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await userModel.findOne({ userName });
  console.log(user);
  if (!user) {
    return res.status(401).json({
      message: `User with name ${userName} doesn't exist`,
    });
  }

  const isValidPassword = password === user.password;

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Wrong Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res.json({
    message: "Logged in successfully",
  });
});

router.get("/user", async (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "Unautherised access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findOne({ _id: decoded.id })
      .select("-password -__v");
    console.log(user);
    res.status(200).json({
      message: "user fetched successfully",
      user: user,
    });
  } catch (error) {
    res.status(401).json({
      message: "Unautherised access",
      error,
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    message: "logout successfully",
  });
});

module.exports = router;
