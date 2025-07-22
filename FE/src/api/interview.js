import axios from "axios";

// All functions now use the correct /api prefix
const API_PREFIX = "/api";

const getInterview = async () => {
    try {
        const response = await axios.get(`${API_PREFIX}/interview`);
        return response.data;
    } catch (error) {
        console.error("Error fetching interview by ID:", error);
        throw error;
    }
};

const getInterviewById = async (id) => {
    try {
        const response = await axios.get(`${API_PREFIX}/interview/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching interview by ID:", error);
        throw error;
    }
};

const postInterview = async (job_id) => {
    try {
        const response = await axios.post(`${API_PREFIX}/interview`, {
            user_id: "6823fa67b6e0d3df4e613a56",
            job_id: job_id,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating interview:", error);
        throw error;
    }
};

const getInterviewLogById = async (id) => {
    try {
        const response = await axios.get(`${API_PREFIX}/interview/log/${id}`);
        return response.data.data.chat;
    } catch (error) {
        console.error("Error fetching interview log by ID:", error);
        throw error;
    }
};

export { getInterview, getInterviewById, postInterview, getInterviewLogById };