const mongooes = require("mongoose");

async function connectToDB() {
  await mongooes
    .connect(
      "mongodb+srv://chaudharygobind:helloApnaPassword@cluster0.kzioxt2.mongodb.net/"
    )
    .then(() => console.log("Connected to DataBase"));
}

module.exports = connectToDB;
