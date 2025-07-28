const mongooes = require("mongoose");

async function connectToDB() {
  await mongooes
    .connect(
      "mongodb+srv://chaudharygobind24:y55bK2Bh3JjHzuLI@cluster0.kzioxt2.mongodb.net/test/notes"
    )
    .then(() => console.log("Connected to DataBase"));
}

module.exports = connectToDB;
