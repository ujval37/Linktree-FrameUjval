// Import necessary modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// Create HTTP server
const server = http.createServer((req, res) => {
  // GET / (Index Route)
  // Return a frame which renders an image with four redirect buttons
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Farcaster Frame Example</title>
          <meta name="fc:frame" content="vNext">
          <meta name="fc:frame:image" content="https://fc-dev-call.replit.app/image">
      </head>
      <body>
          <div id="frameContainer" style="width: 600px; height: 400px;">
              <div>
                  <button onclick="window.location.href = 'https://www.farcaster.xyz/'">Farcaster</button>
                  <button onclick="window.location.href = 'https://www.warpcast.com/'">Warpcast</button>
                  <button onclick="window.location.href = 'https://docs.farcaster.xyz/'">Farcaster Docs</button>
                  <button onclick="window.location.href = 'https://www.thehubble.xyz/'">Farcaster Hubble</button>
              </div>
          </div>
      </body>
      </html>`);
    res.end();
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
