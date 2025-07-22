import axios from "axios";

// All functions now use the correct /api prefix
const API_PREFIX = "/api";

export const getJobs = async () => {
    try {
        const response = await axios.get(`${API_PREFIX}/jobs`);
        return response.data;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return { data: [] }; // Return empty array on failure
    }
};

export const getJobbyId = async (id) => {
    try {
        const response = await axios.get(`${API_PREFIX}/jobs/id/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        throw error;
    }
};

export const updateJob = async (id, jobData) => {
    try {
        const response = await axios.put(`${API_PREFIX}/jobs/id/${id}`, jobData);
        return response.data;
    } catch (error) {
        console.error("Error updating job:", error);
        throw error;
    }
};

export const createJob = async (jobData) => {
    try {
        const response = await axios.post(`${API_PREFIX}/jobs`, jobData);
        return response.data;
    } catch (error) {
        console.error("Error creating job:", error);
        throw error;
    }
};
