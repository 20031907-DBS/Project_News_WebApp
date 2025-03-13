require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;
const apikey = process.env.API_KEY;
console.log("creating a backend for project- news web app");

if (!apikey) {
  console.error("API KEY wrong fix the api key");
  console.log("exiting server");
} else {
  console.log("API KEY found ");
  app.get("/", (req, res) => {
    res.send("server created with api");
  });

  console.log("starting to listein");
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}
