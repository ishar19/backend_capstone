import { useEffect, useState } from "react";
import { getJobById } from "../services/jobs";
export default function JobDetails() {
  const url = new URL(window.location.href);
  const id = url.pathname.split("/")[2];
  const [jobDetails, setJobDetails] = useState(null);
  useEffect(() => {
    getJobById(id)
      .then((response) => {
        console.log(response);
        if (response?.response?.status === 500) {
          return setJobDetails(null);
        } else if (response?.response?.status === 404) {
          return setJobDetails(null);
        }
        setJobDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
        setJobDetails(null);
      });
  }, [id]);
  console.log(jobDetails);
  return (
    <div>
      <h1>Job Details</h1>
      {jobDetails && (
        <div>
          <h3>{jobDetails.title}</h3>
          <h2>{jobDetails.companyName}</h2>
          <p>{jobDetails.description}</p>
          <p>{jobDetails.location}</p>
          <p>{jobDetails.salary}</p>
          <p>{jobDetails.locationType}</p>
          <p>{jobDetails.jobType}</p>
          <h4>Skills</h4>
          <ul>
            {jobDetails.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
      {jobDetails === null && <p>Job not found</p>}
    </div>
  );
}
