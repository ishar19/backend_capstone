import axios from "axios";
import { BACKEND_URL } from "../constant";
export const getAllJobs = async ({ skills }) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/job/all?skills=${skills}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getJobById = async (jobnumber) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/job/view/${jobnumber}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/job/create`,
      jobData,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateJob = async (jobnumber, jobData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/job/update/${jobnumber}`,
      jobData,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
