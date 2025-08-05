const express = require("express");
const router = express.Router();
const { postController } = require("../controllers/post.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authMiddleware, //set req.user = user
  upload.single("image"),
  postController
);

module.exports = router;
