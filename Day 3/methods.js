const express = require("express");

const app = express(); //server created

app.use(express.json());

const note = [];
// /home api
app.get("/home", (req, res) => {
  res.send("home page");
});

//  /about api
app.get("/about", (req, res) => {
  res.send("about page");
});

//use to get data from server by user
app.get("/notes", (req, res) => {
  res.json(note);
  // console.log(note);
});

// use to post data on server by user
app.post("/notes", (req, res) => {
  note.push(req.body);
  res.json({
    message: "Notes added sucessfully",
  });
});

// start server

app.listen(3000, () => {
  console.log("server is runing on port 3000");
});
