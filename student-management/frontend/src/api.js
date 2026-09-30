import axios from "axios";

// Using relative /api so Vite proxy forwards to http://localhost:5000 in dev
// or fall back directly to http://localhost:5000
const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add auth token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("mern_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Student Endpoints (Matching PDF Page 8 & 9)
export const fetchStudents = (search = "", course = "") => {
  const params = {};
  if (search) params.search = search;
  if (course && course !== "All") params.course = course;
  return API.get("/students", { params });
};

export const fetchStudentById = (id) => API.get(`/students/${id}`);

export const createStudent = (studentData) => API.post("/students", studentData);

export const updateStudent = (id, studentData) => API.put(`/students/${id}`, studentData);

export const deleteStudent = (id) => API.delete(`/students/${id}`);

// Dashboard stats endpoint
export const fetchDashboardStats = () => API.get("/students/dashboard/stats");

// Auth Endpoints
export const loginUser = (credentials) => API.post("/auth/login", credentials);

export const registerUser = (userData) => API.post("/auth/register", userData);

export const getCurrentUser = () => API.get("/auth/me");

export default API;
