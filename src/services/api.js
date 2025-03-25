const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Get API URL from .env

const api = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
  
  addHomeContents: async (formData) => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    const response = await fetch(`${API_BASE_URL}/users/add-home-contents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Add Bearer Token
      },
      body: formData, // FormData automatically sets correct headers
    });

    return response.json();
  },
};

export default api;
