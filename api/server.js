require("dotenv").config();
const express = require("express");
// const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
const app = express();

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );

app.use(cors());
app.use(express.json());

app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ message: "test" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ message: "test" });
});

if (process.env.APP_PORT) app.listen(process.env.APP_PORT);

module.exports = app;
