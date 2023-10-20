require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
const app = express();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://react-chat-two-orcin.vercel.app",
    ],
  })
);
app.use(express.json());

app.post("/server/register", (req, res) => {
  const { email, password } = req.body;
});

app.post("/server/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
});

if (process.env.APP_PORT) app.listen(process.env.APP_PORT);

module.exports = app;
