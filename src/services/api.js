import axios from "axios";

// Create axios instance with better defaults
const api = axios.create({
  baseURL: "https://study-edusync-cga0cgbtane5cefm.centralindia-01.azurewebsites.net/api", // Adjust backend URL as needed
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000, // 10 seconds timeout
  withCredentials: true, // Enable if your backend uses cookies/sessions
});

// Request interceptor to add auth token and custom headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Add request timestamp for debugging
    config.headers["X-Request-Timestamp"] = new Date().toISOString();
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor with enhanced error handling
api.interceptors.response.use(
  (response) => {
    // Optionally transform successful responses here
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.warn("Request canceled:", error.message);
      return Promise.reject({ isCanceled: true });
    }

    const errorResponse = error.response || {};
    const status = errorResponse.status;
    const data = errorResponse.data || {};

    console.error("API Error:", {
      status,
      message: error.message,
      url: error.config?.url,
      error: data.errors || data.message || "Unknown error",
    });

    // Handle specific status codes
    if (status === 401) {
      console.warn("Unauthorized - Redirecting to login");
      localStorage.removeItem("token");
      window.location.href = "/login?sessionExpired=true";
    } else if (status === 403) {
      console.warn("Forbidden - Missing permissions");
    } else if (status === 404) {
      console.warn("Resource not found");
    } else if (status >= 500) {
      console.error("Server error occurred");
    }

    // Return consistent error format
    return Promise.reject({
      status,
      message: data.message || error.message,
      errors: data.errors,
      isNetworkError: !error.response,
    });
  }
);

// Export cancel token creator for request cancellation
const CancelToken = axios.CancelToken;
export const createCancelToken = () => CancelToken.source();

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://localhost:7133/api", // Ensure this matches your backend port
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Automatically attach JWT token to all requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Optional: Intercept responses for global error handling (e.g. 401)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.warn("Unauthorized. You may need to log in again.");
//       // Optionally: clear localStorage and redirect to login
//       // localStorage.clear();
//       // window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
