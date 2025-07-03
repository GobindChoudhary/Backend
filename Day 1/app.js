const catMe = require("cat-me");
console.log(catMe());
const http = require("http");

const server = http.createServer((req, res) => {
  res.write("Hello, Client!");
  res.end("GOBIND");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
