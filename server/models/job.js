const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  locationType: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  refUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", jobSchema);
