const http = require("http");
const fs = require("fs");
const app = http.createServer();
const path = require("path");

const part_donload = path.join(__dirname, "download");

app.on("listening", () => {
  console.log("http://localhost:3000");
});
app.on("request", (req, res) => {
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
app.listen(3000);
