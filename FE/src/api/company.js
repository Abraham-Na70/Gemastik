import axios from "axios";

// All functions now use the correct /api prefix
const API_PREFIX = "/api";

export const getCompanies = async () => {
    try {
        const response = await axios.get(`${API_PREFIX}/company`);
        return response.data;
    } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
    }
};

export const getCompanyIdandName = async () => {
    try {
        const data = await getCompanies();
        const companyIdAndName = data.data.map((company) => ({
            id: company._id,
            name: company.name,
        }));
        return companyIdAndName;
    } catch (error) {
        console.error("Error fetching company ID and name:", error);
        throw error;
    }
};

export const getCompanyById = async (id) => {
    try {
        const response = await axios.get(`${API_PREFIX}/company/id/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching company by ID:", error);
        throw error;
    }
};

export const updateCompany = async (id, companyData) => {
    try {
        const response = await axios.put(
            `${API_PREFIX}/company/id/${id}`,
            companyData
        );
        return response.data;
    } catch (error) {
        console.error("Error updating company:", error);
        throw error;
    }
};

export const createCompany = async (companyData) => {
    try {
        const response = await axios.post(`${API_PREFIX}/company`, companyData);
        return response.data;
    } catch (error) {
        console.error("Error creating company:", error);
        throw error;
    }
};