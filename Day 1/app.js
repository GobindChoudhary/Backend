const catMe = require("cat-me");
console.log(catMe());
const http = require("http"); // importing http module (no need to install pre build)

const server = http.createServer((req, res) => {
  res.write("Hello, Client!");
  res.end("Hello ,world");
}); // server created

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
}); //starting the server
