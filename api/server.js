require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

const salt = bcrypt.genSaltSync(10);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const hasedPass = bcrypt.hashSync(password, salt);

  try {
    const { error } = await supabase.from("users").insert({
      email,
      password: hasedPass,
      first_name: firstName,
      last_name: lastName,
    });

    if (error)
      res.status(500).json({ message: "Error while creating your account" });

    const token = jwt.sign(email, process.env.JWT_SECRET_KEY);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error while creating your account" });
  }
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ message: "test" });
});

if (process.env.APP_PORT) app.listen(process.env.APP_PORT);

module.exports = app;
