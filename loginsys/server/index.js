const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require('./models/Users');

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/client');

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      UserModel.create({ name, email, password: hash })
        .then(user => res.json("success"))
        .catch(err => res.status(500).json({ status: "error", message: err.message }));
    })
    .catch(err => res.status(500).json({ status: "error", message: err.message }));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ status: "error", message: "User not found" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ email: user.email, role: user.role }, "amansecret-key", { expiresIn: '2d' });
          res.cookie('token', token, { httpOnly: true });
          return res.json({ Status: "success", role: user.role, message: "Logged in successfully", token });
        } else {
          return res.status(400).json({ status: "error", message: "Password is incorrect" });
        }
      });
    })
    .catch(err => res.status(500).json({ status: "error", message: err.message }));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});