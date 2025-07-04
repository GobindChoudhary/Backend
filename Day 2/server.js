const express = require("express");

const app = express(); //server created

// /home api
app.get("/home", (req, res) => {
  res.send("home page");
});

//  /about api
app.get("/about", (req, res) => {
  res.send("about page");
});

// start server

app.listen(3000, () => {
  console.log("server is runing on port 3000");
});
