const express = require("express");

const app = express(); // server created

app.use(express.json()); //middleWare to read json

const notes = [];

app.get("/notes", (req, res) => {
  res.json(notes);
});
app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.json({
    message: "Note added successfully",
  });
});
app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;
  delete notes[index];
  res.json({
    message: `Note Deleted at index ${index}`,
  });
});
app.patch("/notes/:index", (req, res) => {
  const index = req.params.index;
  const { title, description } = req.body;
  notes[index].title = title;
  res.json({
    message: `Notes Updated`,
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
