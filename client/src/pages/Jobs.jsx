import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobs";
import { useNavigate } from "react-router-dom";
export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getAllJobs()
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.log(error);
        setJobs([]);
      });
  }, []);
  const navigate = useNavigate();
  const gotoJobDetails = (id) => {
    navigate(`/jobs/${id}`);
  };
  return (
    <div>
      <h1>Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "200px",
              }}
            >
              <p>{job.location}</p> <p>{job.salary}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "200px",
              }}
            >
              <p>{job.locationType}</p> <p>{job.jobType}</p>
            </div>
            <div>
              {job.skills.map((skill, idx) => (
                <span
                  style={{
                    marginRight: "5px",
                  }}
                  key={idx}
                >
                  {skill}
                </span>
              ))}
            </div>
            <button
              style={{
                padding: "5px 10px",
                backgroundColor: "#ED5353",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                marginTop: "5px",
              }}
              onClick={() => gotoJobDetails(job._id)}
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
