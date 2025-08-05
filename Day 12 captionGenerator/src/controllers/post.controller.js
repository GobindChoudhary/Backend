const postModel = require("../models/post.model");
const captionGenerator = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

async function postController(req, res) {
  const file = req.file;
  
  const base64ImageFile = new Buffer.from(file.buffer).toString("base64");
  const caption = await captionGenerator(base64ImageFile);
  const result = await uploadFile(file.buffer, `${uuidv4()}`);
  const post = await postModel.create({
    caption: caption,
    image: result.url,
    user: req.user_id,
  });
  return res.status(201).json({
    message: "post created successfully",
    post,
  });
}

module.exports = { postController };
