const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const env = require("dotenv");
env.config();
const registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).send("Please fill all the fields");
    }
    const isUserExist =
      (await User.findOne({ email })) || (await User.findOne({ mobile }));
    if (isUserExist) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, req.body);
    if (!email || !password) {
      return res.status(400).send("Please fill all the fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid email or password");
    }
    // todo move secret to env
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "240h",
    });
    res.status(200).json({
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  } catch (err) {
    next(err);
  }
};

const allUsers = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please fill all the fields");
    }
    if (email === "admin@backend.com" && password === "admin") {
      const users = await User.find();
      return res.status(200).json(users);
    } else {
      return res.status(400).send("Invalid email or password");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser, allUsers };
