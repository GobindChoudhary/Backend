const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({
      message: "Please login",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_URL);

    const user = await userModel.findOne({ _id: decoded.id });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorise access",
      error,
    });
  }
}

module.exports = authMiddleware;
