const Job = require("../models/job");

const createJob = async (req, res, next) => {
  try {
    const {
      title,
      companyName,
      location,
      salary,
      description,
      locationType,
      jobType,
      skills,
    } = req.body;

    if (
      !title ||
      !companyName ||
      !location ||
      !salary ||
      !description ||
      !locationType ||
      !jobType ||
      !skills
    ) {
      return res.status(400).send("Please fill all the fields");
    }
    // css,js, html, node, rust
    // ["css", "js", "html", "node", "rust"]
    const skillsArray = skills.split(",").map((skill) => skill.trim());
    const newJob = new Job({
      title,
      companyName,
      location,
      salary,
      description,
      locationType,
      jobType,
      skills: skillsArray,
      refUserId: req.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await newJob.save();
    res.status(201).send("Job created successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = { createJob };
