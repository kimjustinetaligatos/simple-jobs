import axios from "axios";

const API_URL = "https://dev-api-sti.neitiviti.online/jobs";

// Get the token from localStorage
const getToken = () => localStorage.getItem("token");
const getUsername = () => localStorage.getItem("username");

// View all jobs
export const getAllJobs = async () => {
  const response = await axios.post(`${API_URL}/all`, { username:getUsername() },{
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

// Add a new job
export const addJob = async (jobData) => {
  const response = await axios.post(`${API_URL}/add`, { ...jobData, username:getUsername() }, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

// Edit a job
export const editJob = async (jobId, jobData) => {
  const response = await axios.put(`${API_URL}/${jobId}`, { ...jobData, username:getUsername() }, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

// Delete a job
export const deleteJob = async (jobId) => {
  const response = await axios.delete(`${API_URL}/${jobId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    data: {username:getUsername() }
  });
  return response.data;
};
