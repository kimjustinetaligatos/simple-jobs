import React, { useEffect, useState } from "react";
import { getAllJobs, addJob, editJob, deleteJob } from "../api/jobs";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", description: "" });
  const [editingJob, setEditingJob] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getAllJobs();
      setJobs(response.data || []);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to fetch jobs.");
    }
  };

  const handleAddJob = async () => {
    try {
      await addJob(newJob);
      setMessage("Job added successfully!");
      fetchJobs();
      setNewJob({ title: "", description: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add job.");
    }
  };

  const handleEditJob = async () => {
    try {
      await editJob(editingJob.id, { title: editingJob.title, description: editingJob.description });
      setMessage("Job updated successfully!");
      fetchJobs();
      setEditingJob(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update job.");
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);
      setMessage("Job deleted successfully!");
      fetchJobs();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete job.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Jobs</h1>

      {message && <div className="alert alert-info">{message}</div>}

      {/* Add Job */}
      <div className="mb-4">
        <h3>Add New Job</h3>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Job Title"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Job Description"
          value={newJob.description}
          onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
        ></textarea>
        <button className="btn btn-success" onClick={handleAddJob}>
          Add Job
        </button>
      </div>

      {/* Job List */}
      <div>
        <h3>All Jobs</h3>
        {jobs.map((job) => (
          <div key={job.id} className="card mb-3">
            <div className="card-body">
              {editingJob && editingJob.id === job.id ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editingJob.title}
                    onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  />
                  <textarea
                    className="form-control mb-2"
                    value={editingJob.description}
                    onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  ></textarea>
                  <button className="btn btn-primary me-2" onClick={handleEditJob}>
                    Save
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditingJob(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h5>{job.title}</h5>
                  <p>{job.description}</p>
                  <button className="btn btn-warning me-2" onClick={() => setEditingJob(job)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteJob(job.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
