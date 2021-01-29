const express = require("express");
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// start the Express server
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`server started at http://localhost:${port}`);
});