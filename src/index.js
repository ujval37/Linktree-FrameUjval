const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Handle requests for the root URL "/"
  if (req.url === "/") {
    // Read the HTML file from the src directory
    const htmlFilePath = path.join(__dirname, "src", "InteractiveFrame.html"); // Adjust the file path accordingly
    fs.readFile(htmlFilePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading HTML file:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
      } else {
        // If the file is read successfully, return the content with a 200 OK status
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    // For all other requests, return a 404 Not Found error
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Define the port
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
