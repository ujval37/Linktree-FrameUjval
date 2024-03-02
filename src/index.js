// Import necessary modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// Create HTTP server
const server = http.createServer((req, res) => {
  // GET / (Index Route)
  // Return the index.html file
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/image") {
    // GET /image
    // Return the image used in the image tag
    const imagePath = path.join(__dirname, "frame-fc.png");
    const imageStream = fs.createReadStream(imagePath);
    res.writeHead(200, { "Content-Type": "image/png" });
    imageStream.pipe(res);
  } else {
    // Catchall 404 Route
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

// Define the port
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
