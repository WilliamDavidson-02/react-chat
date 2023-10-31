require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { CloudFog } = require("lucide-react");
const app = express();

const salt = bcrypt.genSaltSync(10);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/user", async (req, res) => {
  const { token } = req.cookies;

  try {
    const email = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { data } = await supabase
      .from("users")
      .select(
        "id, first_name, last_name, profile_image, friend_requests:friend_requests_sender_id_fkey (recipient_id)"
      )
      .eq("email", email);

    const recipientIds = data[0].friend_requests.map(
      (request) => request.recipient_id
    );

    if (data.length === 0)
      return res.status(404).json({ message: "User not found" });
    const { first_name, last_name, profile_image, id } = data[0];
    res.status(200).json({
      email,
      firstName: first_name,
      lastName: last_name,
      profileImage: profile_image,
      id,
      recipientIds,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error while retrieving your information" });
  }
});

app.post("/api/register", async (req, res) => {
  const { email, password, firstName, lastName, colorIndex } = req.body;
  const hasedPass = bcrypt.hashSync(password, salt);

  const { data } = await supabase
    .from("users")
    .select("email")
    .eq("email", email);

  if (data.length > 0)
    return res.status(409).json({
      message: `Email already exists, sign in with ${email} or try another email.`,
    });

  try {
    const { error } = await supabase.from("users").insert({
      email,
      password: hasedPass,
      first_name: firstName,
      last_name: lastName,
      profile_image: colorIndex,
    });

    if (error)
      res.status(500).json({ message: "Error while creating your account" });

    const token = jwt.sign(email, process.env.JWT_SECRET_KEY);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error while creating your account" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data } = await supabase
      .from("users")
      .select("password")
      .eq("email", email);

    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const passOk = bcrypt.compareSync(password, data[0].password);

    if (!passOk) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(email, process.env.JWT_SECRET_KEY);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error while retrieving your information" });
  }
});

app.get("/api/search/:user/:id", async (req, res) => {
  const { user = "", id } = req.params;
  const [firstName = user, lastName = user] = user.split(" ");

  try {
    const { data } = await supabase
      .from("users")
      .select("id, first_name, last_name, profile_image")
      .or(
        `first_name.ilike.%${firstName}%, last_name.ilike.%${lastName}%, email.ilike.%${user}%` // Matches any of the conditions
      )
      .neq("id", id);

    const usersFound = data.map((user) => {
      const { first_name, last_name, profile_image, id } = user;
      return {
        firstName: first_name,
        lastName: last_name,
        profileImage: profile_image,
        id,
      };
    });

    res.status(200).json(usersFound);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error while retrieving your information" });
  }
});

app.post("/api/friend-request", async (req, res) => {
  const { searchedUser, user } = req.body;

  try {
    const { error } = await supabase.from("friend_requests").insert({
      sender_id: user,
      recipient_id: searchedUser,
    });

    if (error) {
      return res
        .status(500)
        .json({ message: "Error while sending friend request" });
    }

    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while sending friend request" });
  }
});

if (process.env.APP_PORT) app.listen(process.env.APP_PORT);

module.exports = app;
