const express = require("express");
const router = express.Router();
const { registerUser, loginUser, allUsers } = require("../controllers/user");
router.get("/", (req, res) => {
  res.status(200).send("Auth Route!");
});
// take the email, name, mobile, and password from the request body
// check if the user already exists in the database
// hash the password using bcrypt
// save the user to the database
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", allUsers);
module.exports = router;
