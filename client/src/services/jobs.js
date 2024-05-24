import axios from "axios";

export const getAllJobs = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/job/all");
    return response;
  } catch (error) {
    return error;
  }
};

export const getJobById = async (jobnumber) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/job/view/${jobnumber}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
