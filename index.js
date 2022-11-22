const http = require("http");
const server = http.createServer();
const fs = require("fs");
const path = require("path");

const part_donload = path.join(__dirname, "download");

server.on("request", (req, res) => {
  if (req.url === "/") {
    res.end(fs.readFileSync("index.html"));
    return;
  }
  if (req.url === "/upload") {
    const filename = req.headers["file-name"];
    const pname = path.join(part_donload, filename);
    req.on("data", (chunk) => {
      fs.appendFileSync(pname, chunk);
      // console.log(`recived chunk ${chunk.length}`);
    });
    res.end("uploaded!!");
  }
});

server.on("listening", () => {
  console.log("http://localhost:3000");
});
server.listen(3000);
