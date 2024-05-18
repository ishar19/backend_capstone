const express = require("express");
const router = express.Router();
const { createJob } = require("../controllers/job");
const { verifyAuth } = require("../middleware/verifyAuth");
router.get("/", (req, res) => {
  res.status(200).send("Job Route!");
});
router.post("/create", verifyAuth, createJob);
module.exports = router;
