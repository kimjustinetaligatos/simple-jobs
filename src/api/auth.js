import axios from "axios";

const API_BASE_URL = "https://dev-api-sti.neitiviti.online";

export const signup = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/users/signup`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const login = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
