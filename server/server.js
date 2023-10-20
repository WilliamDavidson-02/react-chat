require("dotenv").config();
const express = require("express");
const app = express();

app.get("/server/test", (req, res) => {
  res.json({ body: "test" + Date.now() });
});

if (process.env.APP_PORT) app.listen(process.env.APP_PORT);

module.exports = app;
