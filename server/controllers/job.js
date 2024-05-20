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
const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find()
      .select(["title", "skills", "companyName"]) // select only these fields
      .sort({ createdAt: -1 }); // -1 for descending order
    res.status(200).send(jobs);
  } catch (err) {
    next(err);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const { jobnumber } = req.params;
    const job = await Job.findById(jobnumber);
    // if job is not found in the database it will give 500 because Job.findById() will throw an error instead of returning null
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.status(200).send(job);
  } catch (err) {
    next(err);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { jobnumber } = req.params;
    const job = await Job.findById(jobnumber);
    const skillsArray = req.body.skill
      ? req.body.skills.split(",").map((skill) => skill.trim())
      : null;
    const updatedJob = await Job.findByIdAndUpdate(
      jobnumber,
      {
        title: req.body.title || job.title,
        companyName: req.body.companyName || job.companyName,
        location: req.body.location || job.location,
        salary: req.body.salary || job.salary,
        description: req.body.description || job.description,
        locationType: req.body.locationType || job.locationType,
        jobType: req.body.jobType || job.jobType,
        skills: skillsArray || job.skills,
        updatedAt: new Date(),
        createdAt: job.createdAt,
      },
      { new: true }
    );
    res.status(200).send(updatedJob);
  } catch (err) {
    next(err);
  }
};
module.exports = { createJob, getAllJobs, getJobById, updateJob };
