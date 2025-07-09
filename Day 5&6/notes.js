const express = require("express");
const connectToDB = require("./src/DB/db");
const noteModel = require("./src/models/note.model");
const app = express();
app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;

  await noteModel.create({
    title,
    content,
  });
  res.json({
    message: "note created sucessfull",
  });
});

app.patch("/notes/:id", async (req, res) => {
  const { title, content } = req.body;
  const noteId = req.params.id;
  await noteModel.findOneAndUpdate(
    {
      _id: noteId,
    },
    {
      title,
      content,
    }
  );
  res.json({
    message: "note Updated sucessfull",
  });
});

app.delete("/notes/:id", async (req, res) => {
  const noteId = req.params.id;

  await noteModel.findOneAndDelete({
    _id: noteId,
  });
  res.json({
    message: "note deleted sucessfull",
  });
});

app.get("/notes/", async (req, res) => {
  const notes = await noteModel.find();
  res.json({
    notes,
  });
});

connectToDB();
app.listen(3000, () => {
  console.log("sever is running on port 3000");
});
